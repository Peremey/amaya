<script setup lang="ts">
import type { Offer, Purchase } from '#shared/types/paywall'

defineProps<{
    purchase: Purchase
    offer: Offer | null
}>()

const emit = defineEmits<{ continue: [] }>()

const CONFETTI_COLORS = ['var(--c-primary)', 'var(--c-yellow)', 'var(--c-pink)', 'var(--c-green)', 'var(--c-accent)']
const confetti = Array.from({ length: 14 }, (_, i) => ({
    left: `${(i * 7 + 3) % 100}%`,
    background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    animationDelay: `${(i % 5) * 0.35}s`,
    animationDuration: `${2.6 + (i % 3) * 0.5}s`,
}))

const title = ref<HTMLElement>()
onMounted(() => title.value?.focus())
</script>

<template>
    <section class="success" aria-labelledby="success-title">
        <div class="success__confetti" aria-hidden="true">
            <span v-for="(style, i) in confetti" :key="i" class="success__piece" :style="style" />
        </div>

        <div class="success__content">
            <svg class="success__art" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
                <circle cx="60" cy="60" r="56" fill="var(--c-yellow)" />
                <circle cx="60" cy="60" r="44" fill="#ffdd75" />
                <path
                    d="M60 26l9.6 19.4 21.4 3.1-15.5 15.1 3.7 21.3L60 74.8 40.8 84.9l3.7-21.3L29 48.5l21.4-3.1Z"
                    fill="#fff"
                />
            </svg>

            <h1 id="success-title" ref="title" class="success__title" tabindex="-1">Ура! Всё открыто!</h1>
            <p class="success__text">
                Теперь открыты все уровни и персонажи.<br>Играй сколько хочется!
            </p>

            <dl class="success__details">
                <div class="success__row">
                    <dt>Тариф</dt>
                    <dd>{{ offer?.title ?? purchase.offerId }}</dd>
                </div>
                <div class="success__row">
                    <dt>Дата</dt>
                    <dd>{{ formatDate(purchase.createdAt) }}</dd>
                </div>
            </dl>
        </div>

        <div class="success__footer">
            <PaywallPurchaseButton @click="emit('continue')">Начать играть</PaywallPurchaseButton>
        </div>
    </section>
</template>

<style scoped lang="scss">
.success {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
    padding: calc(env(safe-area-inset-top) + 24px) var(--gutter) calc(env(safe-area-inset-bottom) + 16px);
    overflow: hidden;

    &__confetti {
        position: absolute;
        inset: 0;
        pointer-events: none;
    }

    &__piece {
        position: absolute;
        top: -20px;
        width: 10px;
        height: 14px;
        border-radius: 3px;
        // Два прохода (~5–8.6 с с учётом задержек), затем кусочки остаются за нижним краем экрана
        animation: fall linear 2 both;
    }

    &__content {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        text-align: center;
    }

    &__art {
        width: 120px;
        height: 120px;
        animation: pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }

    &__title {
        font-size: 30px;
        font-weight: 800;
        line-height: 1.15;
        outline: none;
    }

    &__text {
        font-size: 17px;
        font-weight: 600;
        color: var(--c-text-muted);
    }

    &__details {
        width: 100%;
        margin-top: 8px;
        padding: 6px 16px;
        border-radius: var(--r-m);
        background: var(--c-surface);
        box-shadow: var(--shadow-card);
    }

    &__row {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        padding: 10px 0;
        font-size: 15px;

        & + & {
            border-top: 1px solid var(--c-border);
        }

        dt {
            color: var(--c-text-muted);
            font-weight: 600;
        }

        dd {
            font-weight: 800;
            text-align: right;
        }
    }

    &__footer {
        position: relative;
        padding-top: 16px;
    }
}

@keyframes fall {
    from {
        transform: translateY(0) rotate(0);
    }

    to {
        transform: translateY(110dvh) rotate(540deg);
    }
}

@keyframes pop {
    from {
        transform: scale(0.3);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
