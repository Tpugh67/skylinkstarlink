import BackOfficeLayout from '@/components/layout/BackOfficeLayout'
export const dynamic = 'force-dynamic'
export default function Layout({ children }: { children: React.ReactNode }) {
  return <BackOfficeLayout>{children}</BackOfficeLayout>
}
