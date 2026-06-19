-- Добавление колонки категории в таблицу постов блога
ALTER TABLE blog_posts ADD COLUMN category VARCHAR(50) DEFAULT 'BLOG' NOT NULL;
