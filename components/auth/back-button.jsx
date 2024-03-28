"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export const BackButton = ({ href, label, loading }) => {
  return (
    <Button disabled={loading} variant="link" className="font-normal w-full" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
