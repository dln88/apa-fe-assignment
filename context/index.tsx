"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { LobbyItemInterface, LobbyInterface } from "@/consts";

interface LobbiesInterface {
  lobbyItems: Array<LobbyItemInterface>;
  liveLobbyItems: Array<LobbyItemInterface>;
  gamesOfTheMonth: Array<LobbyItemInterface>;
}

interface MenuInterface {
  menu: LobbiesInterface;
  setMenu: (menu: LobbiesInterface) => void;
}

interface MenuProviderProps {
  children: ReactNode;
  initialData: {
    lobby: LobbyInterface;
    liveLobby: LobbyInterface;
    gamesOfTheMonth: Array<LobbyItemInterface>;
  };
}

const MenuContext = createContext<MenuInterface | undefined>(undefined);

const getUniqueLobbyItems = (
  items: Array<LobbyItemInterface>
): Array<LobbyItemInterface> => {
  const seen = new Set<string>();
  return items.filter((item) => {
    const isDuplicate = seen.has(item.path);
    seen.add(item.path);
    return !isDuplicate;
  });
};

export const MenuProvider = ({ children, initialData }: MenuProviderProps) => {
  const uniqueLobbyItems = useMemo(
    () => getUniqueLobbyItems(initialData.lobby.items),
    [initialData.lobby.items]
  );

  const uniqueLiveLobbyItems = useMemo(
    () => getUniqueLobbyItems(initialData.liveLobby.items),
    [initialData.liveLobby.items]
  );

  const [menu, setMenu] = useState<LobbiesInterface>({
    lobbyItems: uniqueLobbyItems,
    liveLobbyItems: uniqueLiveLobbyItems,
    gamesOfTheMonth: initialData.gamesOfTheMonth,
  });

  return (
    <MenuContext.Provider value={{ menu, setMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
