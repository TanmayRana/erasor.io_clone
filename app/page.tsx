"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Home() {
  const { user } = useKindeBrowserClient();
  console.log(user);

  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}
