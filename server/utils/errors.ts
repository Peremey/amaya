import type { ApiErrorCode, ApiErrorData } from "#shared/types/paywall"

/** Единый формат ошибок API: HTTP-статус + машиночитаемый code в data */
export const apiError = (statusCode: number, code: ApiErrorCode, message: string) => {
    return createError({
        statusCode,
        statusMessage: message,
        data: { code } satisfies ApiErrorData,
    })
}
