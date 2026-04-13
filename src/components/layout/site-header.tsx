"use client";

import Link from "next/link";
import { Heart, GitCompare, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFavoritesStore } from "@/stores/favorites-store";
import { useCompareStore } from "@/stores/compare-store";
import { useSessionStore } from "@/stores/session-store";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  const favIds = useFavoritesStore((s) => s.ids);
  const compareIds = useCompareStore((s) => s.ids);
  const { user, logout } = useSessionStore();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white shadow-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-primary">
          <span className="text-xl">🏠</span>
          <span className="hidden sm:inline">HomeFinder PH</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/properties">
            <Button variant="ghost" size="sm">
              Buy / Rent
            </Button>
          </Link>
          <Link href="/seller">
            <Button variant="ghost" size="sm">
              Sell
            </Button>
          </Link>
          <Link href="/shoutouts">
            <Button variant="ghost" size="sm">
              ShoutOuts
            </Button>
          </Link>
          <Link href="/favorites" className="relative">
            <Button variant="ghost" size="sm">
              <Heart className="mr-1 h-4 w-4" />
              Favorites
              {favIds.length > 0 && (
                <Badge className="ml-1 h-5 min-w-5 px-1 py-0 text-[10px]">
                  {favIds.length}
                </Badge>
              )}
            </Button>
          </Link>
          <Link href="/compare" className="relative">
            <Button variant="ghost" size="sm">
              <GitCompare className="mr-1 h-4 w-4" />
              Compare
              {compareIds.length > 0 && (
                <Badge className="ml-1 h-5 min-w-5 px-1 py-0 text-[10px]">
                  {compareIds.length}
                </Badge>
              )}
            </Button>
          </Link>
        </nav>

        {/* Auth area */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="hidden items-center gap-2 md:flex">
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                {user.email}
              </span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Link href="/auth/login" className="hidden md:block">
              <Button variant="outline" size="sm">
                Sign in
              </Button>
            </Link>
          )}

          {/* Mobile burger */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
