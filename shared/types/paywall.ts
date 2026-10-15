export type OfferPeriod = 'month' | 'year'

export interface Offer {
    id: string
    title: string
    description: string
    /** Цена в минимальных единицах валюты (копейках) */
    price: number
    currency: string
    period: OfferPeriod
    badge: string | null
}

export interface Purchase {
    id: number
    offerId: string
    deviceId: string
    createdAt: string
}

export type ApiErrorCode =
    | 'VALIDATION_ERROR'
    | 'OFFER_NOT_FOUND'
    | 'NETWORK_ERROR'
    | 'INTERNAL_ERROR'

export interface ApiErrorData {
    code: ApiErrorCode
}

export interface OffersResponse {
    offers: Offer[]
}

export interface PurchaseRequest {
    offerId: string
    deviceId: string
}

export interface PurchaseResponse {
    purchase: Purchase
}

export interface RestoreRequest {
    deviceId: string
}

export interface RestoreResponse {
    purchase: Purchase | null
}
