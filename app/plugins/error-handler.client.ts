/** Перехват непредвиденных ошибок приложения и показ их в общем уведомлении */
export default defineNuxtPlugin((nuxtApp) => {
    const report = (error: unknown) => {
        // Ошибки API уже показаны в api()
        if (error instanceof ApiError) return
        console.error(error)
        nuxtApp.runWithContext(() => useNotify().error(new ApiError('INTERNAL_ERROR', null).message))
    }

    nuxtApp.hook('vue:error', report)
    nuxtApp.hook('app:error', report)
})
