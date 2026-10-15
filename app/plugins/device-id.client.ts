const STORAGE_KEY = 'amaya_device_id'

const generateId = (): string => {
    if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()
    // Фолбэк для старых webview без randomUUID (UUID v4)
    const bytes = crypto.getRandomValues(new Uint8Array(16))
    bytes[6] = (bytes[6]! & 0x0f) | 0x40
    bytes[8] = (bytes[8]! & 0x3f) | 0x80
    const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

const readStoredId = () => {
    try {
        return localStorage.getItem(STORAGE_KEY)
    } catch {
        return null
    }
}

const storeId = (id: string) => {
    try {
        localStorage.setItem(STORAGE_KEY, id)
    } catch {
        // localStorage недоступен: идентификатор живёт только в рамках сессии
    }
}

/** Имитация сессионного ключа: id создаётся при первом запуске и хранится в localStorage */
export default defineNuxtPlugin(() => {
    let id = readStoredId()
    if (!id) {
        id = generateId()
        storeId(id)
    }
    useDeviceId().value = id
})
