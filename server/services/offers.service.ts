import { getDb } from "../db/db"
import { findAllOffers } from "../repositories/offers.repository"

export const getOffers = (db = getDb()) => {
    return findAllOffers(db)
}
