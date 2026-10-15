import type Database from "better-sqlite3"

const CREATE_TABLES = `
CREATE TABLE IF NOT EXISTS offers (
    id          TEXT    PRIMARY KEY,
    title       TEXT    NOT NULL,
    description TEXT    NOT NULL,
    price       INTEGER NOT NULL,
    currency    TEXT    NOT NULL,
    period      TEXT    NOT NULL CHECK (period IN ('month', 'year')),
    badge       TEXT,
    sort        INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS purchases (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    offer_id   TEXT    NOT NULL REFERENCES offers(id),
    device_id  TEXT    NOT NULL,
    created_at TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_purchases_device_id ON purchases(device_id);
`

const SEED_OFFERS = `
INSERT OR IGNORE INTO offers (id, title, description, price, currency, period, badge, sort) VALUES
    ('yearly',  'Год',   'Полный доступ на 12 месяцев', 199000, 'RUB', 'year',  'Выгода 45%', 1),
    ('monthly', 'Месяц', 'Полный доступ на 1 месяц',    29900,  'RUB', 'month', NULL,         2);
`

export const initSchema = (db: Database.Database) => {
    db.transaction(() => {
        db.exec(CREATE_TABLES)
        db.exec(SEED_OFFERS)
    })()
}
