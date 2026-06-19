package ru.serp.corpwish.service.file;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import java.util.List;

@Service
public class FileService {
    private Path rootPath;

    @Value("${app.storage.path}")
    public void setStoragePath(String path) {
        this.rootPath = Paths.get(path).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.rootPath);
        }
        catch (IOException e) {
            throw new RuntimeException("Storage init failed", e);
        }
    }

    public String store(MultipartFile file) {
        if (file.isEmpty()) throw new IllegalArgumentException("File is empty");
        validate(file);
        String ext = getExtension(file);
        String filename = UUID.randomUUID() + "." + ext;
        Path target = rootPath.resolve(filename).normalize();

        if (!target.startsWith(rootPath)) throw new SecurityException("Invalid path");

        try (InputStream in = file.getInputStream()) {
            Files.copy(in, target, StandardCopyOption.REPLACE_EXISTING);
        }
        catch (IOException e) {
            throw new RuntimeException("Store failed", e);
        }
        return filename;
    }

    public void delete(String filename) {
        Path target = rootPath.resolve(filename).normalize();
        try {
            Files.deleteIfExists(target);
        } catch (IOException ignored) {}
    }

    private void validate(MultipartFile file) {
        String ext = getExtension(file);
        if (!List.of("jpg", "jpeg", "png", "webp").contains(ext))
            throw new IllegalArgumentException("Unsupported format");
        if (file.getSize() > 5L * 1024 * 1024)
            throw new IllegalArgumentException("File too large");
    }

    private String getExtension(MultipartFile file) {
        String name = file.getOriginalFilename();
        return name != null && name.contains(".")
                ? name.substring(name.lastIndexOf('.') + 1).toLowerCase()
                : "jpg";
    }
}
