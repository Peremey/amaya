import type { PurchaseRequest } from "#shared/types/paywall"
import { getDb } from "../db/db"
import { findOfferById } from "../repositories/offers.repository"
import { findLatestPurchaseByDevice, insertPurchase } from "../repositories/purchases.repository"

export const purchaseOffer = (data: PurchaseRequest, db = getDb()) => {
    const offer = findOfferById(db, data.offerId)
    if (!offer) {
        throw apiError(404, "OFFER_NOT_FOUND", `Offer "${data.offerId}" not found`)
    }
    return insertPurchase(db, { offerId: offer.id, deviceId: data.deviceId })
}

export const restorePurchases = (deviceId: string, db = getDb()) => {
    return findLatestPurchaseByDevice(db, deviceId)
}
