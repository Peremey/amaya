<script setup lang="ts">
defineProps<{ loading?: boolean }>()
const emit = defineEmits<{ retry: [] }>()
</script>

<template>
    <div class="load-error" role="alert">
        <svg class="load-error__art" viewBox="0 0 96 64" aria-hidden="true" focusable="false">
            <g fill="#fff">
                <ellipse cx="48" cy="40" rx="40" ry="20" />
                <ellipse cx="34" cy="28" rx="18" ry="16" />
                <ellipse cx="58" cy="24" rx="20" ry="18" />
            </g>
            <circle cx="40" cy="36" r="3" fill="var(--c-text)" />
            <circle cx="58" cy="36" r="3" fill="var(--c-text)" />
            <path d="M42 48q7-6 14 0" fill="none" stroke="var(--c-text)" stroke-width="3" stroke-linecap="round" />
        </svg>
        <p class="load-error__title">Не получилось загрузить тарифы</p>
        <p class="load-error__text">Проверьте интернет и попробуйте ещё раз</p>
        <button class="load-error__button" type="button" :disabled="loading" @click="emit('retry')">
            Попробовать снова
        </button>
    </div>
</template>

<style scoped lang="scss">
.load-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 16px;
    border-radius: var(--r-m);
    background: var(--c-primary-soft);
    text-align: center;

    &__art {
        width: 96px;
        height: 64px;
        margin-bottom: 4px;
    }

    &__title {
        font-size: 17px;
        font-weight: 800;
    }

    &__text {
        font-size: 14px;
        font-weight: 600;
        color: var(--c-text-muted);
    }

    &__button {
        @include button-reset;
        @include focus-ring;

        margin-top: 10px;
        min-height: 48px;
        padding: 0 24px;
        border-radius: var(--r-pill);
        background: var(--c-surface);
        border: 3px solid var(--c-primary-dark);
        color: var(--c-primary-dark);
        font-weight: 800;
        cursor: pointer;

        &:disabled {
            opacity: 0.6;
            cursor: default;
        }
    }
}
</style>
