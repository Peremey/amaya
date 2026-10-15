import type Database from "better-sqlite3"
import type { Offer, OfferPeriod } from "#shared/types/paywall"

interface OfferRow {
    id: string
    title: string
    description: string
    price: number
    currency: string
    period: OfferPeriod
    badge: string | null
}

const SELECT_FIELDS = "id, title, description, price, currency, period, badge"

const toOffer = (row: OfferRow): Offer => ({ ...row })

export const findAllOffers = (db: Database.Database): Offer[] => {
    const rows = db
        .prepare(`SELECT ${SELECT_FIELDS} FROM offers ORDER BY sort`)
        .all() as OfferRow[]
    return rows.map(toOffer)
}

export const findOfferById = (db: Database.Database, id: string): Offer | null => {
    const row = db
        .prepare(`SELECT ${SELECT_FIELDS} FROM offers WHERE id = ?`)
        .get(id) as OfferRow | undefined
    return row ? toOffer(row) : null
}
