"use client";

import React, { useEffect, useMemo } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import LobbyComponent from "@/components/Lobby";
import { useMenu } from "@/context";

export default function LobbyPage() {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const { menu } = useMenu();

  const lobbyItems = useMemo(() => menu?.lobbyItems ?? [], [menu?.lobbyItems]);

  useEffect(() => {
    if (!activeCategory) {
      router.replace(
        pathname + `?category${encodeURI(`=${lobbyItems[0].path}`)}`
      );
    }
  }, [activeCategory]);

  return <LobbyComponent />;
}
