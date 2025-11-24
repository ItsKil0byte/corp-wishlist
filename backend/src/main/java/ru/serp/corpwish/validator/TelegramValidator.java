package ru.serp.corpwish.validator;

import org.springframework.beans.factory.annotation.Value;
import ru.serp.corpwish.DTO.TelegramUser;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

public class TelegramValidator {

    @Value("${telegram.bot_token}")
    private String bot_token;

    public TelegramUser validate(String rawInitData) throws NoSuchAlgorithmException, InvalidKeyException {
        Map<String, String> params = parseQuery(rawInitData);

        String hash = params.get("hash");
        params.remove("hash");

        String dataCheckString = createDataCheckString(params);

        try{
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] key = digest.digest(bot_token.getBytes(StandardCharsets.UTF_8));

            Mac hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(key, "HmacSHA256");
            hmac.init(secretKeySpec);

            byte[] hmacBytes = hmac.doFinal(dataCheckString.getBytes(StandardCharsets.UTF_8));
            StringBuilder validateHash = new StringBuilder();

            for(byte b : hmacBytes){
                validateHash.append(String.format("%02x", b));
            }

            if(hash.contentEquals(validateHash)){
                TelegramUser user = new TelegramUser(
                        Long.parseLong(params.get("id")),
                        params.get("username"),
                        params.get("first_name"),
                        params.get("last_name")
                );
                return user;
            }
            else {
                throw new IllegalArgumentException("Failed to validate initdata");
            }
        }catch (Exception e){
            return null;
        }
    }

    private Map<String, String> parseQuery(String query) {
        Map<String, String> params = new HashMap<>();
        String[] pairs = query.split("&");
        for (String pair : pairs) {
            int idx = pair.indexOf("=");
            if (idx > 0) {
                String key = pair.substring(0, idx);
                String value = pair.substring(idx + 1);
                try {
                    value = java.net.URLDecoder.decode(value, StandardCharsets.UTF_8);
                } catch (Exception ignored) {}
                params.put(key, value);
            }
        }
        return params;
    }

    private String createDataCheckString(Map<String, String> telegramData) {
        var sb = new StringBuilder();
        telegramData.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .forEach(entry -> sb.append(entry.getKey()).append("=").append(entry.getValue()).append("\n"));
        sb.deleteCharAt(sb.length() - 1);
        return sb.toString();
    }
}
