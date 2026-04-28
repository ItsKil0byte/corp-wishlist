CREATE TABLE IF NOT EXISTS wish_images (
    wish_id BIGINT NOT NULL REFERENCES wishes(id) ON DELETE CASCADE,
    file_name VARCHAR(255),
    sort_order INTEGER NOT NULL,
    PRIMARY KEY (wish_id, sort_order)
);

CREATE INDEX IF NOT EXISTS idx_wish_images_wish_id ON wish_images(wish_id);