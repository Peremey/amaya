import Database from "better-sqlite3"

let db: Database.Database | null = null

export const DB_PATH = () => {
    return `${process.cwd()}/data/store.db`
}

export const getDb = (dbPath: string = DB_PATH()) => {
    if (!db) {
        db = new Database(dbPath)
        db.pragma("foreign_keys = ON")
        db.pragma("journal_mode = WAL")
        db.pragma("busy_timeout = 5000")
    }
    return db
}
