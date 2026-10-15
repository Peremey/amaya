<script setup lang="ts">
import type { Offer } from '#shared/types/paywall'

const props = defineProps<{
    offer: Offer
    selected: boolean
    disabled?: boolean
}>()

const emit = defineEmits<{ select: [id: string] }>()

const price = computed(() => formatPrice(props.offer.price, props.offer.currency))
const perMonth = computed(() =>
    props.offer.period === 'year'
        ? `${formatPrice(monthlyPrice(props.offer), props.offer.currency)} в месяц`
        : null)
</script>

<template>
    <button
        type="button"
        role="radio"
        :aria-checked="selected"
        :tabindex="selected ? 0 : -1"
        :disabled="disabled"
        :class="['offer', { 'offer--selected': selected }]"
        @click="emit('select', offer.id)"
    >
        <span v-if="offer.badge" class="offer__badge">{{ offer.badge }}</span>

        <span class="offer__radio" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
                <path d="M6 12.5l4 4 8-9" />
            </svg>
        </span>

        <span class="offer__info">
            <span class="offer__title">{{ offer.title }}</span>
            <span v-if="perMonth" class="offer__per-month">{{ perMonth }}</span>
            <span v-else class="offer__description">{{ offer.description }}</span>
        </span>

        <span class="offer__price">
            <span class="offer__amount">{{ price }}</span>
            <span class="offer__period">/ {{ PERIOD_LABELS[offer.period] }}</span>
        </span>
    </button>
</template>

<style scoped lang="scss">
.offer {
    @include button-reset;
    @include focus-ring;

    position: relative;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 12px;
    width: 100%;
    min-height: 80px;
    padding: 16px;
    border: 3px solid var(--c-border);
    border-radius: var(--r-m);
    background: var(--c-surface);
    box-shadow: var(--shadow-card);
    cursor: pointer;
    transition:
        border-color var(--t-fast),
        box-shadow var(--t-fast),
        transform var(--t-fast),
        background-color var(--t-fast);

    &:active:not(:disabled) {
        transform: scale(0.98);
    }

    &:disabled {
        cursor: default;
    }

    &--selected {
        border-color: var(--c-primary-dark);
        background: var(--c-primary-soft);
        box-shadow: var(--shadow-card-active);
        transform: translateY(-2px);
    }

    &__badge {
        position: absolute;
        top: -12px;
        right: 14px;
        padding: 3px 10px;
        border-radius: var(--r-pill);
        background: var(--c-accent-dark);
        color: var(--c-text-inverse);
        font-size: 13px;
        font-weight: 800;
        line-height: 1.3;
        box-shadow: 0 2px 0 var(--c-accent-deep);
    }

    &__radio {
        display: grid;
        place-items: center;
        width: 28px;
        height: 28px;
        border: 3px solid var(--c-border-strong);
        border-radius: 50%;
        background: var(--c-surface);
        transition: background-color var(--t-fast), border-color var(--t-fast);

        svg {
            width: 18px;
            height: 18px;
            fill: none;
            stroke: #fff;
            stroke-width: 3;
            stroke-linecap: round;
            stroke-linejoin: round;
            opacity: 0;
            transform: scale(0.5);
            transition: opacity var(--t-fast), transform var(--t-fast);
        }
    }

    &--selected &__radio {
        border-color: var(--c-primary-dark);
        background: var(--c-primary-dark);

        svg {
            opacity: 1;
            transform: scale(1);
        }
    }

    &__info {
        display: flex;
        flex-direction: column;
        min-width: 0;
    }

    &__title {
        font-size: 19px;
        font-weight: 800;
        line-height: 1.2;
    }

    &__description {
        font-size: 14px;
        font-weight: 600;
        color: var(--c-text-muted);
    }

    &__per-month {
        align-self: flex-start;
        margin-top: 4px;
        padding: 1px 8px;
        border-radius: var(--r-pill);
        background: var(--c-green-soft);
        color: var(--c-green-text);
        font-size: 13px;
        font-weight: 800;
    }

    &__price {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        text-align: right;
        white-space: nowrap;
    }

    &__amount {
        font-size: 19px;
        font-weight: 800;
        line-height: 1.2;

        @include from($bp-md) {
            font-size: 20px;
        }
    }

    &__period {
        font-size: 14px;
        font-weight: 600;
        color: var(--c-text-muted);
    }
}
</style>
