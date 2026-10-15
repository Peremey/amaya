<template>
    <header class="hero">
        <svg class="hero__art" viewBox="0 0 320 170" aria-hidden="true" focusable="false">
            <defs>
                <path id="hero-star" d="M0-9 2.7-2.8 9-2.8 4-1 5.6 7.5 0 3.8-5.6 7.5-4-1-9-2.8-2.7-2.8Z" />
            </defs>

            <!-- облака -->
            <g fill="#fff">
                <ellipse cx="46" cy="58" rx="30" ry="12" />
                <ellipse cx="62" cy="48" rx="18" ry="14" />
                <ellipse cx="270" cy="38" rx="28" ry="11" />
                <ellipse cx="256" cy="30" rx="15" ry="12" />
            </g>

            <!-- звёзды -->
            <g fill="var(--c-yellow)">
                <use href="#hero-star" class="hero__star" transform="translate(36 112) scale(0.9)" />
                <use href="#hero-star" class="hero__star hero__star--2" transform="translate(286 92)" />
                <use href="#hero-star" class="hero__star hero__star--3" transform="translate(108 22) scale(0.7)" />
                <use href="#hero-star" class="hero__star hero__star--4" transform="translate(222 70) scale(0.6)" />
            </g>

            <!-- холм -->
            <path d="M0 170 C60 140 110 136 160 140 C210 136 260 140 320 170 Z" fill="#8fd694" />

            <!-- боковые башни -->
            <rect x="92" y="78" width="34" height="80" rx="4" fill="#fff" />
            <rect x="194" y="78" width="34" height="80" rx="4" fill="#fff" />
            <path d="M86 82 109 38 132 82Z" fill="var(--c-pink)" />
            <path d="M188 82 211 38 234 82Z" fill="var(--c-pink)" />
            <rect x="103" y="96" width="12" height="16" rx="6" fill="var(--c-primary-soft)" />
            <rect x="205" y="96" width="12" height="16" rx="6" fill="var(--c-primary-soft)" />

            <!-- стена с зубцами -->
            <path
                d="M118 100h14v-10h12v10h12v-10h8v10h12v-10h12v10h14v58H118Z"
                fill="#fff"
            />

            <!-- центральная башня -->
            <rect x="140" y="56" width="40" height="52" rx="4" fill="#fff" />
            <path d="M132 60 160 16 188 60Z" fill="var(--c-primary)" />
            <rect x="153" y="70" width="14" height="18" rx="7" fill="var(--c-yellow)" />
            <path d="M160 16V2" stroke="var(--c-text)" stroke-width="2" stroke-linecap="round" />
            <path class="hero__flag" d="M160 2 178 7 160 12Z" fill="var(--c-accent)" />

            <!-- ворота -->
            <path d="M146 158v-22a14 14 0 0 1 28 0v22Z" fill="var(--c-primary-dark)" />
        </svg>

        <h1 class="hero__title">Открой всю игру!</h1>
        <p class="hero__subtitle">Все уровни, персонажи и миры без ограничений</p>
    </header>
</template>

<style scoped lang="scss">
.hero {
    text-align: center;

    &__art {
        display: block;
        width: 100%;
        max-width: 230px;
        height: auto;
        margin: 0 auto;
        overflow: visible;

        @include from($bp-md) {
            max-width: 250px;
        }

        @media (min-height: 860px) {
            max-width: 280px;
        }

        // Низкие экраны: оставляем место для тарифов
        @media (max-height: 700px) {
            max-width: 150px;
        }
    }

    &__title {
        margin-top: 4px;
        font-size: 26px;
        font-weight: 800;
        line-height: 1.15;
        letter-spacing: -0.01em;

        @include from($bp-md) {
            font-size: 30px;
        }
    }

    &__subtitle {
        max-width: 320px;
        margin: 6px auto 0;
        font-size: 15px;
        font-weight: 600;
        color: var(--c-text-muted);
    }

    &__star {
        transform-box: fill-box;
        transform-origin: center;
        animation: twinkle 2.4s ease-in-out infinite;

        &--2 {
            animation-delay: 0.6s;
        }

        &--3 {
            animation-delay: 1.2s;
        }

        &--4 {
            animation-delay: 1.8s;
        }
    }

    &__flag {
        transform-box: fill-box;
        transform-origin: left center;
        animation: wave 1.6s ease-in-out infinite;
    }
}

@keyframes twinkle {
    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.35;
    }
}

@keyframes wave {
    0%,
    100% {
        transform: scaleX(1);
    }

    50% {
        transform: scaleX(0.75);
    }
}
</style>
