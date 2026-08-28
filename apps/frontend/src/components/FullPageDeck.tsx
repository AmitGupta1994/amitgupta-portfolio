"use client";

import React from "react";

interface FullPageDeckProps {
  children: React.ReactNode;
}

export default function FullPageDeck({ children }: FullPageDeckProps) {
  return (
    <div className="relative w-full">
      {children}
    </div>
  );
}
