"use client";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function HeroAuthButtons() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <SignUpButton mode="modal">Get Started Free</SignUpButton>
      <SignInButton mode="modal">Sign In</SignInButton>
    </div>
  );
}