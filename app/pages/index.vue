<script setup lang="ts">
const store = usePaywallStore()
const { offers, selectedOfferId, selectedOffer, purchase, purchasedOffer, isPurchasing, isRestoring, isBusy } = storeToRefs(store)

const { status, refresh } = await useAsyncData('offers', () => store.loadOffers())

const isLoading = computed(() => status.value === 'pending' || status.value === 'idle')

const ctaLabel = computed(() => {
    if (isPurchasing.value) return 'Оформляем…'
    if (!selectedOffer.value) return 'Выберите тариф'
    return `Открыть всё за ${formatPrice(selectedOffer.value.price, selectedOffer.value.currency)}`
})

const radioGroup = ref<HTMLElement>()

// Навигация стрелками внутри radiogroup по WAI-ARIA
const onRadioKeydown = (event: KeyboardEvent) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key]
    if (!step || !offers.value.length) return
    event.preventDefault()
    const current = offers.value.findIndex(offer => offer.id === selectedOfferId.value)
    const next = (current + step + offers.value.length) % offers.value.length
    store.selectOffer(offers.value[next]!.id)
    nextTick(() => radioGroup.value?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus())
}

const onContinue = () => {
    // В реальном приложении здесь webview сообщает нативной части о разблокировке контента
    store.reset()
}
</script>

<template>
    <main class="paywall">
        <Transition name="screen" mode="out-in">
            <PaywallSuccess
                v-if="purchase"
                key="success"
                :purchase="purchase"
                :offer="purchasedOffer"
                @continue="onContinue"
            />

            <div v-else key="paywall" class="paywall__screen">
                <div class="paywall__body">
                    <PaywallHero />

                    <section class="paywall__offers" aria-labelledby="offers-title">
                        <h2 id="offers-title" class="paywall__offers-title">Выберите тариф</h2>

                        <PaywallLoader v-if="isLoading" />
                        <PaywallLoadError v-else-if="status === 'error'" :loading="isLoading" @retry="refresh()" />
                        <div
                            v-else
                            ref="radioGroup"
                            class="paywall__cards"
                            role="radiogroup"
                            aria-labelledby="offers-title"
                            @keydown="onRadioKeydown"
                        >
                            <PaywallOfferCard
                                v-for="offer in offers"
                                :key="offer.id"
                                :offer="offer"
                                :selected="offer.id === selectedOfferId"
                                :disabled="isBusy"
                                @select="store.selectOffer"
                            />
                        </div>
                    </section>
                </div>

                <footer class="paywall__footer">
                    <PaywallPurchaseButton
                        :loading="isPurchasing"
                        :disabled="!selectedOffer || isRestoring"
                        @click="store.buy"
                    >
                        {{ ctaLabel }}
                    </PaywallPurchaseButton>

                    <button
                        class="paywall__restore"
                        type="button"
                        :disabled="isBusy || isLoading"
                        @click="store.restore"
                    >
                        {{ isRestoring ? 'Ищем покупки…' : 'Восстановить покупки' }}
                    </button>
                </footer>
            </div>
        </Transition>
    </main>
</template>

<style scoped lang="scss">
.paywall {
    min-height: 100dvh;
    background: linear-gradient(180deg, var(--c-sky-top) 0, var(--c-sky) 280px, var(--c-bg) 560px);

    &__screen {
        display: flex;
        flex-direction: column;
        min-height: 100dvh;
        max-width: var(--page-max);
        margin: 0 auto;
    }

    &__body {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: calc(env(safe-area-inset-top) + 12px) var(--gutter) 8px;

        @include from($bp-md) {
            padding-top: calc(env(safe-area-inset-top) + 20px);
        }
    }

    &__offers {
        margin-top: 32px;
    }

    &__offers-title {
        margin-bottom: 16px;
        font-size: 18px;
        font-weight: 800;
        text-align: center;
    }

    &__cards {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    &__footer {
        position: sticky;
        bottom: 0;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px var(--gutter) calc(env(safe-area-inset-bottom) + 4px);
        background: linear-gradient(180deg, rgba(244, 252, 255, 0) 0, var(--c-bg) 20px);
    }

    &__restore {
        @include button-reset;
        @include focus-ring;

        min-height: 44px;
        margin-top: 6px;
        padding: 0 16px;
        border-radius: var(--r-pill);
        font-size: 15px;
        font-weight: 700;
        color: var(--c-primary-dark);
        text-decoration: underline;
        text-underline-offset: 3px;
        cursor: pointer;

        &:disabled {
            opacity: 0.5;
            cursor: default;
        }
    }
}

.screen-enter-active,
.screen-leave-active {
    transition: opacity var(--t-base), transform var(--t-base);
}

.screen-enter-from,
.screen-leave-to {
    opacity: 0;
    transform: scale(0.98);
}
</style>
