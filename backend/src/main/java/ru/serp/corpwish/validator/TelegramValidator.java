package ru.serp.corpwish.validator;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import ru.serp.corpwish.DTO.TelegramUser;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class TelegramValidator {

    @Value("${telegram.bot_token}")
    private String bot_token;

    private final ObjectMapper objectMapper;

    public TelegramValidator() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
    }

    public TelegramUser validate(String rawInitData){
        try{
            Map<String, String> params = parseQueryString(rawInitData);

            String hash = params.get("hash");
            String userBody = params.get("user");


            if(validateTelegramAuth(params, hash)){
                return objectMapper.readValue(userBody, TelegramUser.class);
            }
            else{
                return null;
            }
        }catch (Exception e){
            return null;
        }
    }

    private boolean validateTelegramAuth(Map<String, String> paramMap, String receivedHash) throws Exception {
        String dataString = paramMap.entrySet().stream()
                .filter(e -> !"hash".equals(e.getKey()))
                .sorted(Map.Entry.comparingByKey())
                .map(e -> e.getKey() + "=" + e.getValue())
                .collect(Collectors.joining("\n"));

        Mac sha256HMAC = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec = new SecretKeySpec(getSecretHashByInitData(), "HmacSHA256");
        sha256HMAC.init(secretKeySpec);

        byte[] hash2 = sha256HMAC.doFinal(dataString.getBytes());

        String calculatedHash = bytesToHex(hash2);

        return calculatedHash.equals(receivedHash);
    }

    private byte[] getSecretHashByInitData() throws InvalidKeyException, NoSuchAlgorithmException {
        Mac sha256HMAC = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec = new SecretKeySpec("WebAppData".getBytes(), "HmacSHA256");
        sha256HMAC.init(secretKeySpec);

        return sha256HMAC.doFinal(bot_token.getBytes());
    }

    private String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

    private Map<String, String> parseQueryString(String queryString){
        Map<String, String> result = new HashMap<>();
        String[] pairs = queryString.split("&");

        for (String pair : pairs) {
            String[] keyValue = pair.split("=", 2);
            String key = URLDecoder.decode(keyValue[0], StandardCharsets.UTF_8);
            String value = URLDecoder.decode(keyValue.length > 1 ? keyValue[1] : "", StandardCharsets.UTF_8);
            result.put(key, value);
        }

        return result;
    }
}
