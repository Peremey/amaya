<script setup lang="ts">
defineProps<{
    loading?: boolean
    disabled?: boolean
}>()

const emit = defineEmits<{ click: [] }>()
</script>

<template>
    <button
        type="button"
        :class="['cta', { 'cta--loading': loading }]"
        :disabled="disabled || loading"
        :aria-busy="loading"
        @click="emit('click')"
    >
        <span v-if="loading" class="cta__spinner" aria-hidden="true" />
        <span class="cta__label">
            <slot />
        </span>
    </button>
</template>

<style scoped lang="scss">
.cta {
    @include button-reset;
    @include focus-ring(var(--c-accent-dark));

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    min-height: 58px;
    padding: 0 20px;
    border-radius: var(--r-pill);
    background: var(--c-accent);
    box-shadow: 0 5px 0 var(--c-accent-dark);
    color: var(--c-text-inverse);
    // Не меньше 18.66px при font-weight ≥ 700: иначе белый на accent не проходит по контрасту
    font-size: 19px;
    font-weight: 800;
    line-height: 1.2;
    text-align: center;
    cursor: pointer;
    transition: transform var(--t-fast), box-shadow var(--t-fast), opacity var(--t-fast);

    &:active:not(:disabled) {
        transform: translateY(3px);
        box-shadow: 0 2px 0 var(--c-accent-dark);
    }

    &:disabled {
        cursor: default;
    }

    &:disabled:not(.cta--loading) {
        opacity: 0.5;
    }

    // reset.scss сбрасывает font-weight у span
    &__label {
        font: inherit;
    }

    &__spinner {
        flex: none;
        width: 22px;
        height: 22px;
        border: 3px solid rgba(255, 255, 255, 0.4);
        border-top-color: var(--c-text-inverse);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
