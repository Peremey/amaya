import type { ApiErrorCode, ApiErrorData } from '#shared/types/paywall'

const BASE_URL = '/api'

const ERROR_MESSAGES: Record<ApiErrorCode, string> = {
    VALIDATION_ERROR: 'Что-то пошло не так с запросом. Попробуйте ещё раз.',
    OFFER_NOT_FOUND: 'Этот тариф сейчас недоступен. Выберите другой.',
    NETWORK_ERROR: 'Нет соединения с интернетом. Проверьте сеть и попробуйте снова.',
    INTERNAL_ERROR: 'Ой! Что-то сломалось. Попробуйте чуть позже.',
}

/** Нормализованная ошибка API: всё, что выбрасывает api(), приводится к этому виду */
export class ApiError extends Error {
    constructor(
        public readonly code: ApiErrorCode,
        public readonly status: number | null,
        message: string = ERROR_MESSAGES[code],
    ) {
        super(message)
        this.name = 'ApiError'
    }
}

interface FetchErrorLike {
    response?: unknown
    statusCode?: number
    data?: { data?: Partial<ApiErrorData> }
}

const isKnownCode = (code: unknown): code is ApiErrorCode =>
    typeof code === 'string' && code in ERROR_MESSAGES

export const toApiError = (error: unknown): ApiError => {
    if (error instanceof ApiError) return error

    const fetchError = (error ?? {}) as FetchErrorLike
    // Нет ответа сервера: сеть недоступна или запрос прерван
    if (!fetchError.response) {
        return new ApiError('NETWORK_ERROR', null)
    }

    const code = fetchError.data?.data?.code
    return new ApiError(isKnownCode(code) ? code : 'INTERNAL_ERROR', fetchError.statusCode ?? null)
}

export const getErrorMessage = (error: unknown) => toApiError(error).message

const notifyError = (message: string) => {
    if (!import.meta.client) return
    const nuxtApp = tryUseNuxtApp()
    nuxtApp?.runWithContext(() => useNotify().error(message))
}

const fetcher = $fetch.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json'
    }
})

type FetcherOptions = NonNullable<Parameters<typeof fetcher>[1]>

export interface ApiOptions extends FetcherOptions {
    /** Не показывать всплывающее уведомление об ошибке */
    silent?: boolean
}

/**
 * Единая точка запросов к API.
 * Любая ошибка нормализуется в ApiError и показывается пользователю во всплывающем уведомлении.
 */
export const api = async <T>(url: string, options: ApiOptions = {}): Promise<T> => {
    const { silent, ...fetchOptions } = options
    try {
        return await fetcher<T>(url, fetchOptions) as T
    } catch (error) {
        const apiError = toApiError(error)
        if (!silent) notifyError(apiError.message)
        throw apiError
    }
}
