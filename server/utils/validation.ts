import type { PurchaseRequest, RestoreRequest } from "#shared/types/paywall"

// Валидаторы вызываются напрямую после readBody: readValidatedBody в h3 v1
// оборачивает выброшенную ошибку в свою и прячет data.code на уровень глубже

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const isObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null

const isDeviceId = (value: unknown): value is string =>
    typeof value === "string" && UUID_RE.test(value)

const isOfferId = (value: unknown): value is string =>
    typeof value === "string" && value.length > 0 && value.length <= 64

export const validatePurchaseBody = (body: unknown): PurchaseRequest => {
    if (!isObject(body) || !isOfferId(body.offerId) || !isDeviceId(body.deviceId)) {
        throw apiError(400, "VALIDATION_ERROR", "Body must contain valid offerId and deviceId")
    }
    return { offerId: body.offerId, deviceId: body.deviceId }
}

export const validateRestoreBody = (body: unknown): RestoreRequest => {
    if (!isObject(body) || !isDeviceId(body.deviceId)) {
        throw apiError(400, "VALIDATION_ERROR", "Body must contain valid deviceId")
    }
    return { deviceId: body.deviceId }
}
