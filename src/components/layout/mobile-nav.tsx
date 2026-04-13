"use client";

import Link from "next/link";
import { Menu, Heart, GitCompare, LogOut, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useFavoritesStore } from "@/stores/favorites-store";
import { useCompareStore } from "@/stores/compare-store";
import { useSessionStore } from "@/stores/session-store";

export function MobileNav() {
  const favIds = useFavoritesStore((s) => s.ids);
  const compareIds = useCompareStore((s) => s.ids);
  const { user, logout } = useSessionStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64">
        <SheetHeader>
          <SheetTitle>HomeFinder PH</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-2">
          <Link href="/properties">
            <Button variant="ghost" className="w-full justify-start">
              Buy / Rent
            </Button>
          </Link>
          <Link href="/seller">
            <Button variant="ghost" className="w-full justify-start">
              Sell
            </Button>
          </Link>
          <Link href="/shoutouts">
            <Button variant="ghost" className="w-full justify-start">
              ShoutOuts
            </Button>
          </Link>
          <Link href="/favorites">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Heart className="h-4 w-4" />
              Favorites {favIds.length > 0 && `(${favIds.length})`}
            </Button>
          </Link>
          <Link href="/compare">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <GitCompare className="h-4 w-4" />
              Compare {compareIds.length > 0 && `(${compareIds.length})`}
            </Button>
          </Link>
          <div className="mt-4 border-t pt-4">
            {user ? (
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  {user.email}
                </p>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </Button>
              </div>
            ) : (
              <Link href="/auth/login">
                <Button variant="outline" className="w-full">
                  Sign in
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
