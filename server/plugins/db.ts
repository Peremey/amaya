import { DB_PATH, getDb } from "../db/db"
import { initSchema } from "../db/schema"

export default defineNitroPlugin(() => {
    const db = getDb(DB_PATH())
    initSchema(db)
})
