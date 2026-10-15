/** Условный идентификатор устройства. Заполняется плагином device-id.client */
export const useDeviceId = () => useState<string>('deviceId', () => '')
