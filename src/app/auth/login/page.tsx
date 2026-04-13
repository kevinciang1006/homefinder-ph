"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useSessionStore } from "@/stores/session-store";
import { toast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const login = useSessionStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    // Simulate brief loading
    setTimeout(() => {
      login(email.trim());
      toast({ title: "Signed in!", description: `Welcome, ${email}` });
      router.push("/");
    }, 400);
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <p className="text-3xl mb-2">🏠</p>
          <CardTitle>Welcome to HomeFinder PH</CardTitle>
          <CardDescription>
            Demo mode — no password required.{" "}
            <span className="font-medium">Enter any email to continue.</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoFocus
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            This is a portfolio demo. No real authentication is performed.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
