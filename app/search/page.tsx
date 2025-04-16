"use client";

import React, { useState, useCallback } from "react";

import Loading from "@/components/Loading";
import debounce from "@/ultis/debounce";
import GameList from "@/components/GameCard";
import customizedFetch from "@/ultis/fetch";
import { useMenu } from "@/context";
import styles from "./index.module.css";

export default function Search() {
  const { menu } = useMenu();
  const [gameList, setGameList] = useState(menu.gamesOfTheMonth);
  const [searchKey, setSearchKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchGames = useCallback(
    async (term: string) => {
      if (!term.trim()) {
        setGameList(menu.gamesOfTheMonth);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await customizedFetch(
          `/en/games/tiles?search=${encodeURIComponent(term.toLowerCase())}`
        );
        setGameList(response.items);
      } catch (err) {
        setError("Failed to search games. Please try again.");
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [menu.gamesOfTheMonth]
  );

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearchKey(value);
      searchGames(value);
    }, 300),
    [searchGames]
  );

  return (
    <div className={styles.search_wrapper}>
      <input
        className={styles.input}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search game..."
      />
      {isLoading ? (
        <div className={styles.loading}>
          <Loading />
        </div>
      ) : (
        <React.Fragment>
          {error && <div className={styles.error}>{error}</div>}
          <GameList
            gameList={gameList}
            image_size={320}
            heading={
              searchKey ? (
                <h3 className={styles.suggestion_text}>
                  {gameList.length > 0
                    ? `${gameList.length} matched results`
                    : "No games found"}
                </h3>
              ) : (
                <h3 className={styles.suggestion_text}>Suggestions for you</h3>
              )
            }
          />
        </React.Fragment>
      )}
    </div>
  );
}
