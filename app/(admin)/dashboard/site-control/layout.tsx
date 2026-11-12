import SiteControlNav from '@/components/admin/site-control/SiteControlNav'

export default function SiteControlLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl text-carve-charcoal">Site Control</h1>
        <p className="font-body text-sm text-carve-mink mt-1">
          Manage all content, banners, and settings visible on the storefront.
        </p>
      </div>
      <SiteControlNav />
      {children}
    </div>
  )
}
