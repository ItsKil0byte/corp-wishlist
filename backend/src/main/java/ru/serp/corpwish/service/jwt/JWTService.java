package ru.serp.corpwish.service.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class JWTService {

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    private final long EXPIRATION = 86400000;

    private SecretKey getSecretKey(){
        byte[] decodedKey = Base64.getDecoder().decode(SECRET_KEY);

        return new SecretKeySpec(decodedKey, SignatureAlgorithm.HS256.getJcaName());
    }

    public String generateToken(Long userID){
        return Jwts.builder()
                .setSubject(userID.toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, getSecretKey())
                .compact();
    }


    public Long extractUserID(String token){
        String subject = Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();

        return Long.parseLong(subject);
    }

    public boolean isTokenValid(String token){
        try{
            Jwts.parserBuilder()
                    .setSigningKey(getSecretKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

    public boolean isTokenExpired(String token) {
        try {
            return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getExpiration().before(new Date());
        }
        catch(ExpiredJwtException e){
            //Для понимания смотрящего этот код. Этот catch для истекиших токенов
            return true;
        }
        catch (JwtException e){
            //А этот для любых других исключений, которые дальше обработаются в фильтре
            return false;
        }
    }
}
