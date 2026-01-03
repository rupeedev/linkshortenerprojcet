#!/bin/sh
# Insert 10 sample rows into the 'links' table using DATABASE_URL from .env

export $(cat ../.env | grep DATABASE_URL | xargs)
psql "$DATABASE_URL" -c "INSERT INTO links (id, short_code, original_url, user_id, created_at, updated_at) VALUES
('d1f5a9e2-3b4c-4d5e-8f01-2a3b4c5d6e7f','r4ndX1','https://example.com/articles/2026/01/guide-to-shorteners','user_37XT0OTE3zjLSLsThYOZpZKtuaH','2026-01-03T08:15:00Z','2026-01-03T08:15:00Z'),
('a3c9b2e1-6f7d-4c3b-9a0f-1b2c3d4e5f60','sH0rt9','https://news.example.org/story/12345?ref=home','user_37XT0OTE3zjLSLsThYOZpZKtuaH','2026-01-03T09:02:30Z','2026-01-03T09:02:30Z'),
('b7e1c2d3-8a9f-4b2c-90d1-2e3f4a5b6c7d','qwertY7','https://blog.example.com/posts/how-to/shorten-urls-effectively','user_37XT0OTE3zjLSLsThYOZpZKtuaH','2026-01-03T10:20:45Z','2026-01-03T10:20:45Z'),
('c4d2e1f0-1234-4abc-9def-0123456789ab','z9x8c7','https://store.example.io/products/long-product-name-with-details','user_37XT0OTE3zjLSLsThYOZpZKtuaH','2026-01-02T17:05:00Z','2026-01-02T17:05:00Z'),
('e5f6a7b8-9c0d-4e1f-8a2b-3c4d5e6f7a8b','abC123','https://docs.example.com/reference/api/v1/links/create','user_37XT0OTE3zjLSLsThYOZpZKtuaH','2026-01-01T12:00:00Z','2026-01-01T12:00:00Z'),
('f1e2d3c4-b5a6-4f7e-9b8a-7c6d5e4f3a2b','lk9mN8','https://media.example.net/videos/2026/short-video-about-links','user_37XT0OTE3zjLSLsThYOZpZKtuaH','2025-12-31T23:59:59Z','2025-12-31T23:59:59Z'),
('1a2b3c4d-5e6f-47a8-9b0c-1d2e3f4a5b6c','short01','https://shop.example.com/item/sku-983274/detail','user_37XT0OTE3zjLSLsThYOZpZKtuaH','2026-01-03T11:11:11Z','2026-01-03T11:11:11Z'),
('2b3c4d5e-6f7a-4b8c-9d0e-2f3a4b5c6d7e','go2getr','https://profiles.example.org/u/johndoe/posts/9876','user_37XT0OTE3zjLSLsThYOZpZKtuaH','2026-01-03T12:30:00Z','2026-01-03T12:30:00Z'),
('3c4d5e6f-7a8b-4c9d-0e1f-3a4b5c6d7e8f','4everme','https://archive.example.com/2025/12/31/year-in-review','user_37XT0OTE3zjLSLsThYOZpZKtuaH','2026-01-02T07:45:00Z','2026-01-02T07:45:00Z'),
('4d5e6f7a-8b9c-4d0e-1f2a-4b5c6d7e8f90','link777','https://promo.example.com/campaign/launch?utm_source=newsletter','user_37XT0OTE3zjLSLsThYOZpZKtuaH','2026-01-03T13:00:00Z','2026-01-03T13:00:00Z');"
