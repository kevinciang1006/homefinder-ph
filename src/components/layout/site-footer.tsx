import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-accent text-accent-foreground mt-12">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-3 font-bold text-white">HomeFinder PH</h3>
            <p className="text-sm text-white/70">
              The modern way to find, compare, and list properties across Metro Manila.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Buyers</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/properties" className="hover:text-white">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-white">
                  My Favorites
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white">
                  Compare
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Sellers</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/seller/new" className="hover:text-white">
                  List a Property
                </Link>
              </li>
              <li>
                <Link href="/seller" className="hover:text-white">
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link href="/shoutouts" className="hover:text-white">
                  View ShoutOuts
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Community</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/shoutouts/new" className="hover:text-white">
                  Post a ShoutOut
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-white">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/20 pt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} HomeFinder PH — Demo project for Ohmyhome PH application.
          Not a real estate platform.
        </div>
      </div>
    </footer>
  );
}
