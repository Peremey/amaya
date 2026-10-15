export type ToastType = 'error' | 'success' | 'info'

export interface Toast {
    id: number
    type: ToastType
    message: string
}

const DEFAULT_TIMEOUT = 4000

let lastId = 0

/** Централизованные всплывающие уведомления. Отрисовываются компонентом AppToaster */
export const useNotify = () => {
    const toasts = useState<Toast[]>('toasts', () => [])

    const dismiss = (id: number) => {
        toasts.value = toasts.value.filter(toast => toast.id !== id)
    }

    const push = (type: ToastType, message: string, timeout = DEFAULT_TIMEOUT) => {
        const id = ++lastId
        // Одинаковое сообщение не дублируем, а показываем заново
        toasts.value = [
            ...toasts.value.filter(toast => toast.message !== message),
            { id, type, message },
        ]
        if (import.meta.client && timeout > 0) {
            setTimeout(() => dismiss(id), timeout)
        }
    }

    return {
        toasts: readonly(toasts),
        dismiss,
        error: (message: string) => push('error', message),
        success: (message: string) => push('success', message),
        info: (message: string) => push('info', message),
    }
}
