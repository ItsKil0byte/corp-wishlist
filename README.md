# Корпоративный вишлист

## Запуск приложения

### Требуется:
- [Docker](https://docs.docker.com/)

### Запуск

1. Склонировать репозиторий

```bash
git clone https://github.com/ItsKil0byte/corporate-wishlist.git
```

2. Перейти в корневую директорию проекта


```bash
cd corporate-wishlist
```

3. Создать файл `.env` в корневой директории проекта и заполнить его по примеру `.env.example`

```bash
cp .env.example .env
```

4. Запустить Docker Compose

```bash
docker-compose up -d
```
### Остановка

```bash
docker-compose down
```

### Доступ

- Приложение будет доступно по адресу: [http://localhost:8080](http://localhost:8080)
- Панель pgAdmin будет доступна по адресу: [http://localhost:5050](http://localhost:5050)

## Локальный запуск

- Смотрите соответствующие README в директориях [backend](./backend/README.md) и [frontend](./frontend/README.md)
