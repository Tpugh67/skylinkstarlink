export const PACKAGES = {
  launch: { name: '5-Page Website', price: 799, priceLabel: '$799' },
  growth: { name: '10-Page Website', price: 1499, priceLabel: '$1,499' },
} as const

export type PackageKey = keyof typeof PACKAGES

export function getPackage(key: string | null): (typeof PACKAGES)[PackageKey] | null {
  if (key && key in PACKAGES) return PACKAGES[key as PackageKey]
  return null
}
