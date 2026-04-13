import Link from "next/link";
import { PlusCircle, TrendingUp, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValuationEstimator } from "@/components/seller/valuation-estimator";
import { SellerAnalytics } from "@/components/seller/seller-analytics";

export default function SellerDashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Seller Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your listings, get valuations, and track your property performance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* List a Property */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <PlusCircle className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="mt-2">List a Property</CardTitle>
            <CardDescription>
              Submit a new property listing for review and publication on HomeFinder PH.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/seller/new">
              <Button className="w-full">Start Listing</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Valuation */}
        <Card className="md:col-span-1 lg:col-span-1">
          <CardHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="mt-2">Instant Valuation</CardTitle>
            <CardDescription>
              Get an AI-powered estimate of your property value in seconds.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ValuationEstimator />
          </CardContent>
        </Card>

        {/* Analytics */}
        <Card>
          <CardHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="mt-2">My Analytics</CardTitle>
            <CardDescription>
              See how your listings are performing across the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <SellerAnalytics />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
