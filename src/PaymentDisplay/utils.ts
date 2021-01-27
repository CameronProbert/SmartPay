var formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'NZD',
});

export function currencyFormat(num: number) {
    return formatter.format(num);
}