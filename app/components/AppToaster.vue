<script setup lang="ts">
import type { ToastType } from '~/composables/useNotify'

const { toasts, dismiss } = useNotify()

const ICONS: Record<ToastType, string> = {
    error: '!',
    success: '✓',
    info: 'i',
}
</script>

<template>
    <Teleport to="body">
        <div class="toaster" aria-live="assertive">
            <TransitionGroup name="toast" tag="ul" class="toaster__list">
                <li
                    v-for="toast in toasts"
                    :key="toast.id"
                    :class="['toast', `toast--${toast.type}`]"
                    :role="toast.type === 'error' ? 'alert' : 'status'"
                >
                    <span class="toast__icon" aria-hidden="true">{{ ICONS[toast.type] }}</span>
                    <p class="toast__message">{{ toast.message }}</p>
                    <button class="toast__close" type="button" aria-label="Закрыть уведомление" @click="dismiss(toast.id)">
                        ×
                    </button>
                </li>
            </TransitionGroup>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
.toaster {
    position: fixed;
    inset: 0 0 auto;
    z-index: 100;
    padding: calc(env(safe-area-inset-top) + 12px) var(--gutter) 0;
    pointer-events: none;

    &__list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-width: var(--page-max);
        margin: 0 auto;
    }
}

.toast {
    --toast-color: var(--c-primary-dark);

    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 8px 12px 14px;
    border-radius: var(--r-m);
    border: 2px solid var(--toast-color);
    background: var(--c-surface);
    box-shadow: 0 10px 30px rgba(34, 50, 84, 0.18);
    pointer-events: auto;

    &--error {
        --toast-color: var(--c-danger);
    }

    &--success {
        --toast-color: var(--c-green-text);
    }

    &__icon {
        flex: none;
        display: grid;
        place-items: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--toast-color);
        color: var(--c-text-inverse);
        font-weight: 800;
        font-size: 15px;
    }

    &__message {
        flex: 1;
        font-size: 15px;
        font-weight: 600;
        line-height: 1.3;
    }

    &__close {
        @include button-reset;
        @include focus-ring;

        flex: none;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        font-size: 26px;
        line-height: 1;
        text-align: center;
        color: var(--c-text-muted);
        cursor: pointer;
    }
}

.toast-enter-active,
.toast-leave-active {
    transition: transform var(--t-base), opacity var(--t-base);
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateY(-16px) scale(0.96);
}
</style>
