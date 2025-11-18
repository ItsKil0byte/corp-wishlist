# Серверная часть

## Локальный запуск

- Сервер запускается с H2 базой данных. Подходит для тестирования и разработки.

### Требуется

- [Java 21](https://https://www.oracle.com/java/technologies/downloads/#jdk21)
- [Maven](https://maven.apache.org/download.cgi)

- Или используйте [IDEA](https://www.jetbrains.com/idea/download) для загрузки и запуска проекта

### Сборка

```bash
mvn clean package
```

### Запуск

```bash
mvn spring-boot:run
```

> IDEA: `Run -> Run 'Application'`

### Доступ

- Сервер доступен по адресу: [http://localhost:8080](http://localhost:8080)
- База данных H2 доступна по адресу: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)

## Docker

- Советую запускать через Docker Compose, описанный в корневом [README.md](../README.md)

### Требуется

- [Docker](https://www.docker.com/)

### Сборка

```bash
docker build -t server .
```

### Запуск

```bash
docker run -p 8080:8080 server
```
