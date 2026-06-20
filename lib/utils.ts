export function formatPrice(amount: number): string {
  return `PKR ${amount.toLocaleString('en-PK')}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function truncate(text: string, length: number): string {
  return text.length > length ? text.slice(0, length) + '…' : text
}

export function generateOrderNumber(): string {
  return 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000)
}
