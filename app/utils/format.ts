import type { Offer } from '#shared/types/paywall'

/** Цена из минимальных единиц (копеек) в строку вида «1 990 ₽» */
export const formatPrice = (amount: number, currency: string) =>
    new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(amount / 100)

export const PERIOD_LABELS: Record<Offer['period'], string> = {
    month: 'мес',
    year: 'год',
}

/** Цена в месяц для годового тарифа (округление вниз) */
export const monthlyPrice = (offer: Offer) =>
    offer.period === 'year' ? Math.floor(offer.price / 12 / 100) * 100 : offer.price

export const formatDate = (iso: string) =>
    new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(iso))
