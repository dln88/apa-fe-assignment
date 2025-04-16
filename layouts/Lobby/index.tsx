"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";

import { useMenu } from "@/context";

import styles from "./index.module.css";

const DEFAULT_IMAGE_SIZE = 50;

export default function GameLayout({
  isLive = false,
  children,
}: {
  isLive?: boolean;
  children: React.ReactNode;
}) {
  const { menu } = useMenu();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const lobbyItems = useMemo(() => {
    if (isLive) return menu?.liveLobbyItems ?? [];
    return menu?.lobbyItems ?? [];
  }, [isLive, isLive ? menu?.liveLobbyItems : menu?.lobbyItems]);

  if (!lobbyItems.length) {
    return (
      <div className={styles.layout}>
        <div className={styles.category_wrapper}>
          <p>No categories available</p>
        </div>
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <div className={styles.category_wrapper}>
        {lobbyItems.map((item) => {
          const isActive = decodeURI(activeCategory || "") === item.path;
          const image = item.animatedSvg.desktop;

          return (
            <Link
              href={{
                pathname: isLive ? "/live-casino" : "/casino",
                query: { category: item.path },
              }}
              key={item.id}
              className={clsx(styles.category_item, isActive && styles.active)}
              prefetch={false}
            >
              <Image
                className={styles.category_thumb}
                src={image.original.src}
                alt={image.alt}
                width={image.original.metadata.width || DEFAULT_IMAGE_SIZE}
                height={image.original.metadata.height || DEFAULT_IMAGE_SIZE}
                loading="lazy"
                quality={75}
              />
            </Link>
          );
        })}
      </div>
      <main>{children}</main>
    </div>
  );
}
