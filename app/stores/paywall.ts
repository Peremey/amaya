import type {
    Offer,
    OffersResponse,
    Purchase,
    PurchaseResponse,
    RestoreResponse,
} from '#shared/types/paywall'

const DEFAULT_OFFER_ID = 'yearly'

export const usePaywallStore = defineStore('paywall', () => {
    const deviceId = useDeviceId()
    const notify = useNotify()

    const offers = ref<Offer[]>([])
    const selectedOfferId = ref<string | null>(null)
    const purchase = ref<Purchase | null>(null)
    const isPurchasing = ref(false)
    const isRestoring = ref(false)

    const selectedOffer = computed(() =>
        offers.value.find(offer => offer.id === selectedOfferId.value) ?? null)

    const purchasedOffer = computed(() =>
        offers.value.find(offer => offer.id === purchase.value?.offerId) ?? null)

    const isBusy = computed(() => isPurchasing.value || isRestoring.value)

    const loadOffers = async () => {
        const response = await api<OffersResponse>('/offers')
        offers.value = response.offers
        if (!offers.value.some(offer => offer.id === selectedOfferId.value)) {
            selectedOfferId.value = offers.value.find(offer => offer.id === DEFAULT_OFFER_ID)?.id
                ?? offers.value[0]?.id
                ?? null
        }
        return response.offers
    }

    const selectOffer = (id: string) => {
        if (!isBusy.value) selectedOfferId.value = id
    }

    const buy = async () => {
        if (!selectedOfferId.value || isBusy.value) return
        isPurchasing.value = true
        try {
            const response = await api<PurchaseResponse>('/purchase', {
                method: 'POST',
                body: { offerId: selectedOfferId.value, deviceId: deviceId.value },
            })
            purchase.value = response.purchase
        } catch {
            // Ошибка уже показана пользователю в api()
        } finally {
            isPurchasing.value = false
        }
    }

    const restore = async () => {
        if (isBusy.value) return
        isRestoring.value = true
        try {
            const response = await api<RestoreResponse>('/restore', {
                method: 'POST',
                body: { deviceId: deviceId.value },
            })
            if (response.purchase) {
                purchase.value = response.purchase
                notify.success('Покупка восстановлена!')
            } else {
                notify.info('На этом устройстве покупок пока нет.')
            }
        } catch {
            // Ошибка уже показана пользователю в api()
        } finally {
            isRestoring.value = false
        }
    }

    const reset = () => {
        purchase.value = null
    }

    return {
        offers,
        selectedOfferId,
        purchase,
        isPurchasing,
        isRestoring,
        selectedOffer,
        purchasedOffer,
        isBusy,
        loadOffers,
        selectOffer,
        buy,
        restore,
        reset,
    }
})
