import { CasinoSVG, LiveSVG, SearchSVG } from "../icons";

export const BASE_API_URL = "https://casino.api.stg.kansino.nl/v1/kansino";

export const HeaderCategories = [
  {
    title: "Casino",
    url: "/casino",
    icon: CasinoSVG,
  },
  {
    title: "Live Casino",
    url: "/live-casino",
    icon: LiveSVG,
  },
  {
    title: "Search",
    url: "/search",
    icon: SearchSVG,
  },
];

export interface ImageMetadataInterface {
  size: number;
  width: number;
  height: number;
}
export interface ImageInterface {
  original: {
    src: string;
    metadata: ImageMetadataInterface;
  };
  alt: string;
}

export interface ExtendedImageInterface extends ImageInterface {}

export interface LobbyItemInterface {
  id: string;
  image: ImageInterface;
  activeImage: ImageInterface;
  gameText: string;
  name: string;
  path: string;
  links: {
    getPageMetadata: string;
    getPage: string;
  };
  animatedSvg: {
    mobile: ImageInterface;
    desktop: ImageInterface;
  };
}

export interface LobbyInterface {
  items: Array<LobbyItemInterface>;
}

export enum GameComponentType {
  LOBBY_BANNER_CAROUSEL = "lobby-banner-carousel",
  GAME_CAROUSEL = "game-carousel",
  GAME_LIST = "game-list",
  HTML = "html",
}

export interface GameItemImageInterface {
  [key: string]: {
    src: string;
    metadata: ImageMetadataInterface;
  };
}

export interface GameItemInterface {
  id: string;
  slug: string;
  image: GameItemImageInterface;
  gameText: string;
  provider: string;
  provider_slug: string;
  jackpot?: {
    value: number;
    threshold: number;
  };
  betSize: {
    min: number;
  };
  isLiveGame: boolean;
}

export interface GameListComponentInterface {
  id: string;
  type: GameComponentType.GAME_LIST;
  games: Array<GameItemInterface>;
}

export interface HTMLComponentInterface {
  id: string;
  type: GameComponentType.HTML;
  htmlString: string;
}

export interface GameListInterface {
  components: Array<GameListComponentInterface | HTMLComponentInterface>;
}
