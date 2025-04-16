import Image from "next/image";
import React from "react";

import { GameItemInterface, LobbyItemInterface } from "@/consts";

import styles from "./index.module.css";

export default function GameCard(props: {
  gameList: Array<GameItemInterface | LobbyItemInterface>;
  image_size: string | number;
  heading?: React.ReactNode;
}) {
  const { gameList, image_size, heading } = props;
  return (
    <div className={styles.game_list_wrapper}>
      {heading && heading}
      <div className={styles.game_list}>
        {gameList.map((game) => (
          <React.Fragment key={game.id}>
            <Image
              loading="lazy"
              quality={75}
              className={styles.game_image}
              src={game.image.original.src}
              alt={game.gameText}
              width={typeof image_size === "number" ? image_size : 320}
              height={typeof image_size === "number" ? image_size : 320}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
