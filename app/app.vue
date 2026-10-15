<script setup lang="ts">
import nunitoCyrillic600 from '~/assets/fonts/nunito/nunito-cyrillic-600-normal.woff2?url'
import nunitoCyrillic800 from '~/assets/fonts/nunito/nunito-cyrillic-800-normal.woff2?url'
import nunitoLatin600 from '~/assets/fonts/nunito/nunito-latin-600-normal.woff2?url'
import nunitoLatin800 from '~/assets/fonts/nunito/nunito-latin-800-normal.woff2?url'

// Предзагрузка начертаний первого экрана: текст сразу рисуется Nunito, без подмены шрифта.
// Латиница нужна для цифр и знака ₽
const PRELOAD_FONTS = [nunitoCyrillic600, nunitoCyrillic800, nunitoLatin600, nunitoLatin800]

// Только на сервере: на клиенте ?url раскрывается в абсолютный адрес, и useHead добавил бы
// вторую пачку preload-ссылок, которую Firefox загружает повторно и помечает как неиспользованную
if (import.meta.server) {
  useHead({
    link: PRELOAD_FONTS.map(href => ({
      rel: 'preload',
      as: 'font',
      type: 'font/woff2',
      href,
      crossorigin: 'anonymous',
    })),
  })
}
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <AppToaster />
  </div>
</template>
