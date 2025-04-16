"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { HeaderCategories } from "@/consts";
import clsx from "clsx";

import styles from "./index.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      {HeaderCategories.map((category) => (
        <Link
          key={category.url}
          href={category.url}
          className={clsx(
            styles.category,
            pathname === category.url && styles.active
          )}
        >
          {category.icon}
          <h3 className={styles.title}>{category.title}</h3>
        </Link>
      ))}
    </header>
  );
}
