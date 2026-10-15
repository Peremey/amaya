import type { PurchaseResponse } from "#shared/types/paywall"
import { purchaseOffer } from "../services/purchase.service"

export default defineEventHandler(async (event): Promise<PurchaseResponse> => {
    const body = validatePurchaseBody(await readBody(event))
    return { purchase: purchaseOffer(body) }
})
