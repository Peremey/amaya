<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const title = computed(() =>
    props.error.statusCode === 404 ? 'Такой страницы нет' : 'Ой! Что-то пошло не так')

const goHome = () => clearError({ redirect: '/' })
</script>

<template>
    <main class="error-page">
        <p class="error-page__code" aria-hidden="true">{{ error.statusCode }}</p>
        <h1 class="error-page__title">{{ title }}</h1>
        <p class="error-page__text">Попробуйте вернуться на главный экран.</p>
        <button class="error-page__button" type="button" @click="goHome">На главную</button>
    </main>
</template>

<style scoped lang="scss">
.error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-height: 100dvh;
    max-width: var(--page-max);
    margin: 0 auto;
    padding: 24px var(--gutter);
    text-align: center;

    &__code {
        font-size: 72px;
        font-weight: 800;
        line-height: 1;
        color: var(--c-primary-dark);
    }

    &__title {
        font-size: 24px;
        font-weight: 800;
    }

    &__text {
        color: var(--c-text-muted);
    }

    &__button {
        @include button-reset;
        @include focus-ring;

        margin-top: 12px;
        min-height: 52px;
        padding: 0 32px;
        border-radius: var(--r-pill);
        background: var(--c-primary-dark);
        box-shadow: 0 4px 0 var(--c-primary-deep);
        color: var(--c-text-inverse);
        font-weight: 800;
        cursor: pointer;
    }
}
</style>
