import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HeroAuthButtons from "@/components/HeroAuthButtons";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2, BarChart3, Shield, Zap, Users, Clock } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-20 text-center md:py-32">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Shorten Your Links,
            <br />
            <span className="text-primary">Amplify Your Reach</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl">
            Create short, memorable links in seconds. Track clicks, analyze performance, and share with confidence.
          </p>
          <HeroAuthButtons />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Powerful Features
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Everything you need to manage and optimize your links effectively
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Link2 className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Quick Link Shortening</CardTitle>
                <CardDescription>
                  Transform long URLs into short, shareable links instantly with our intuitive interface
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <BarChart3 className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Track clicks, geographic data, and referral sources to understand your audience better
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Your data is encrypted and protected with enterprise-grade security standards
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Optimized infrastructure ensures your links redirect users in milliseconds
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Manage links with your team, share access, and collaborate seamlessly
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Clock className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Link Expiration</CardTitle>
                <CardDescription>
                  Set expiration dates for temporary campaigns and time-sensitive content
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Get started in three simple steps
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold">Paste Your URL</h3>
              <p className="text-muted-foreground">
                Enter the long URL you want to shorten into our simple form
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold">Customize & Create</h3>
              <p className="text-muted-foreground">
                Optionally customize your short link and click create
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold">Share & Track</h3>
              <p className="text-muted-foreground">
                Share your link and monitor its performance in real-time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
            Join thousands of users who trust us with their links. Start shortening today!
          </p>
          <HeroAuthButtons />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Link Shortener. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
