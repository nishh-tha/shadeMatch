CREATE TABLE IF NOT EXISTS shades (
    id BIGSERIAL PRIMARY KEY,
    brand VARCHAR(255),
    brand_short VARCHAR(255),
    product VARCHAR(255),
    product_short VARCHAR(255),
    name VARCHAR(255),
    hex VARCHAR(255),
    hue FLOAT,
    saturation FLOAT,
    lightness FLOAT,
    country_group INTEGER
);