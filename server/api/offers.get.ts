import type { OffersResponse } from "#shared/types/paywall"
import { getOffers } from "../services/offers.service"

export default defineEventHandler((): OffersResponse => {
    return { offers: getOffers() }
})
