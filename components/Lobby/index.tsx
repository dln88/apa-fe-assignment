"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import GameList from "../GameCard";

import customizedFetch from "@/ultis/fetch";
import { GameListInterface, GameComponentType } from "@/consts";

import styles from "./index.module.css";

export default function Casino() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const [gameList, setGameList] = useState<GameListInterface>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGameList = useCallback(async () => {
    if (!activeCategory) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await customizedFetch("/pages/en" + activeCategory);
      setGameList({ components: response.components });
    } catch (err) {
      setError("Failed to load games. Please try again later.");
      console.error("Error fetching games:", err);
    } finally {
      setIsLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    fetchGameList();
  }, [fetchGameList]);

  const sortedComponents = useMemo(() => {
    if (!gameList?.components) return [];
    return [...gameList.components].sort((a, b) =>
      a.type === GameComponentType.HTML ? 1 : -1
    );
  }, [gameList?.components]);

  if (isLoading) {
    return <div className={styles.html_content_wrapper}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.html_content_wrapper}>{error}</div>;
  }

  if (!gameList) {
    return (
      <div className={styles.html_content_wrapper}>Category Unavailable</div>
    );
  }

  return (
    <div>
      {sortedComponents.map((component) => {
        if (component.type === GameComponentType.GAME_LIST) {
          return (
            <React.Fragment key={component.id}>
              <GameList gameList={component.games} image_size={320} />
            </React.Fragment>
          );
        }

        if (component.type === GameComponentType.HTML) {
          return (
            <div
              key={component.id}
              className={styles.html_content_wrapper}
              dangerouslySetInnerHTML={{ __html: component.htmlString }}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
