import type Database from "better-sqlite3"
import type { Purchase } from "#shared/types/paywall"

interface PurchaseRow {
    id: number
    offer_id: string
    device_id: string
    created_at: string
}

const SELECT_FIELDS = "id, offer_id, device_id, created_at"

const toPurchase = (row: PurchaseRow): Purchase => ({
    id: row.id,
    offerId: row.offer_id,
    deviceId: row.device_id,
    createdAt: row.created_at,
})

export const insertPurchase = (
    db: Database.Database,
    data: { offerId: string, deviceId: string },
): Purchase => {
    const row = db
        .prepare(`INSERT INTO purchases (offer_id, device_id) VALUES (?, ?) RETURNING ${SELECT_FIELDS}`)
        .get(data.offerId, data.deviceId) as PurchaseRow
    return toPurchase(row)
}

export const findLatestPurchaseByDevice = (
    db: Database.Database,
    deviceId: string,
): Purchase | null => {
    const row = db
        .prepare(`SELECT ${SELECT_FIELDS} FROM purchases WHERE device_id = ? ORDER BY id DESC LIMIT 1`)
        .get(deviceId) as PurchaseRow | undefined
    return row ? toPurchase(row) : null
}
