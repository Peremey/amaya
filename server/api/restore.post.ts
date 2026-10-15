import type { RestoreResponse } from "#shared/types/paywall"
import { restorePurchases } from "../services/purchase.service"

export default defineEventHandler(async (event): Promise<RestoreResponse> => {
    const { deviceId } = validateRestoreBody(await readBody(event))
    return { purchase: restorePurchases(deviceId) }
})
