<template>
    <div class="loader" role="status">
        <span class="loader__balls" aria-hidden="true">
            <span class="loader__ball" />
            <span class="loader__ball" />
            <span class="loader__ball" />
        </span>
        <span class="loader__text">Загружаем тарифы…</span>
    </div>
</template>

<style scoped lang="scss">
.loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-height: 164px;

    &__balls {
        display: flex;
        gap: 10px;
    }

    &__ball {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--c-primary);
        animation: bounce 0.9s ease-in-out infinite;

        &:nth-child(2) {
            background: var(--c-yellow);
            animation-delay: 0.15s;
        }

        &:nth-child(3) {
            background: var(--c-pink);
            animation-delay: 0.3s;
        }
    }

    &__text {
        font-size: 15px;
        font-weight: 700;
        color: var(--c-text-muted);
    }
}

@keyframes bounce {
    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-12px);
    }
}
</style>
