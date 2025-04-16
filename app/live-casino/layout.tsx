import React from "react";

import LobbyLayout from "@/layouts/Lobby";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LobbyLayout isLive>{children}</LobbyLayout>;
}
