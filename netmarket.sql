-- Ushbu skript "maishiy_texnika_db" nomli ma'lumotlar bazasi uchun mo'ljallangan.
-- Agar baza mavjud bo'lmasa, uni avval yaratib oling: CREATE DATABASE maishiy_texnika_db;
-- So'ngra ushbu skriptni ishga tushiring.

-- Mavjud bo'lishi mumkin bo'lgan eski jadvallarni o'chirish (ehtiyotkorlik uchun)
-- DROP TABLE IF EXISTS "inventory_logs",
-- "payments",
-- "sale_items",
-- "sales",
-- "products",
-- "categories",
-- "customers",
-- "users",
-- "roles" CASCADE;

-- 1. Rollar jadvali (Administrator, Menejer, Sotuvchi)
-- Tizimdagi foydalanuvchilarning rollarini saqlaydi.
CREATE TABLE "roles" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL UNIQUE
);

-- 2. Foydalanuvchilar (xodimlar) jadvali
-- Tizimga kira oladigan barcha xodimlarni saqlaydi.
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "full_name" VARCHAR(100) NOT NULL,
    "login" VARCHAR(50) NOT NULL UNIQUE,
    "password_hash" VARCHAR(255) NOT NULL, -- Parol hech qachon ochiq saqlanmaydi!
    "role_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "fk_role" FOREIGN KEY ("role_id") REFERENCES "roles" ("id")
);

-- 3. Mijozlar jadvali
-- Do'kon mijozlari haqidagi ma'lumotlarni saqlaydi.
CREATE TABLE "customers" (
    "id" SERIAL PRIMARY KEY,
    "full_name" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(20) UNIQUE, -- Telefon raqami noyob bo'lishi mumkin
    "created_at" TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Mahsulot kategoriyalari jadvali (masalan, Muzlatgichlar, Televizorlar)
CREATE TABLE "categories" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL UNIQUE,
    "description" TEXT
);

-- 5. Mahsulotlar jadvali
-- Barcha mahsulotlar va ularning xususiyatlari shu yerda saqlanadi.
CREATE TABLE "products" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "sku" VARCHAR(100) UNIQUE, -- Shtrix-kod yoki artikul
    "description" TEXT,
    "cost_price" DECIMAL(12, 2) NOT NULL CHECK ("cost_price" >= 0), -- Kirim narxi
    "selling_price" DECIMAL(12, 2) NOT NULL CHECK ("selling_price" >= 0), -- Sotuv narxi
    "quantity_on_hand" INTEGER NOT NULL DEFAULT 0 CHECK ("quantity_on_hand" >= 0), -- Omborxonadagi qoldiq
    "location" VARCHAR(255), -- Joylashuvi (masalan, Ombor, 3-qator)
    "category_id" INTEGER,
    "created_at" TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "fk_category" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE SET NULL
);

-- 6. Savdolar jadvali
-- Har bir savdo operatsiyasi (chek) uchun bitta yozuv.
CREATE TABLE "sales" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL, -- Savdoni amalga oshirgan xodim
    "customer_id" INTEGER, -- Savdo qilingan mijoz (anonim bo'lishi ham mumkin)
    "total_amount" DECIMAL(15, 2) NOT NULL,
    "created_at" TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id"),
        CONSTRAINT "fk_customer" FOREIGN KEY ("customer_id") REFERENCES "customers" ("id") ON DELETE SET NULL
);

-- 7. Sotilgan mahsulotlar jadvali (Savdo tarkibi)
-- Bitta savdoda (chekda) qanday mahsulotlar, qancha miqdorda va qanday narxda sotilganini bog'laydi.
CREATE TABLE "sale_items" (
    "id" SERIAL PRIMARY KEY,
    "sale_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL CHECK ("quantity" > 0),
    "price_per_unit" DECIMAL(12, 2) NOT NULL, -- Savdo paytidagi narx
    CONSTRAINT "fk_sale" FOREIGN KEY ("sale_id") REFERENCES "sales" ("id") ON DELETE CASCADE,
    CONSTRAINT "fk_product" FOREIGN KEY ("product_id") REFERENCES "products" ("id")
);

-- 8. To'lovlar jadvali
-- Har bir savdo uchun qilingan to'lovlarni saqlaydi (naqd, terminal va h.k.).
CREATE TABLE "payments" (
    "id" SERIAL PRIMARY KEY,
    "sale_id" INTEGER NOT NULL,
    "payment_type" VARCHAR(50) NOT NULL, -- Masalan, 'Naqd', 'Terminal', 'Bo`lib to`lash'
    "amount" DECIMAL(15, 2) NOT NULL,
    "created_at" TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "fk_sale" FOREIGN KEY ("sale_id") REFERENCES "sales" ("id") ON DELETE CASCADE
);

-- 9. Omborxona jurnali
-- Mahsulotlar qoldig'idagi har qanday o'zgarishni (kirim, sotuv, hisobdan chiqarish) qayd etib boradi.
CREATE TABLE "inventory_logs" (
    "id" SERIAL PRIMARY KEY,
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL, -- O'zgarishni kim qilgani
    "change_type" VARCHAR(50) NOT NULL, -- 'Kirim', 'Sotuv', 'Qaytarish', 'Hisobdan chiqarish'
    "quantity_change" INTEGER NOT NULL, -- Ijobiy (kirim) yoki manfiy (sotuv) son
    "reason" TEXT, -- Sabab (masalan, 'Inventarizatsiya natijasi')
    "created_at" TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "fk_product" FOREIGN KEY ("product_id") REFERENCES "products" ("id"),
        CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id")
);

-- -- Boshlang'ich ma'lumotlarni kiritish (masalan, rollar)
-- INSERT INTO
--     "roles" ("name")
-- VALUES ('Administrator'),
--     ('Menejer'),
--     ('Sotuvchi-konsultant');

-- -- Ishlash tezligini oshirish uchun indekslar yaratish
-- CREATE INDEX ON "products" ("name");

-- CREATE INDEX ON "sales" ("created_at");

-- CREATE INDEX ON "sale_items" ("sale_id");

-- CREATE INDEX ON "sale_items" ("product_id");

-- -- Skript tugadi
-- SELECT 'Ma`lumotlar bazasi jadvallari muvaffaqiyatli yaratildi!';