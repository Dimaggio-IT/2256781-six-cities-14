import { TCityItems } from './types';

const FAVORITE_QUANTITY = 4;

const MAX_RATING = 5;

const OFFER_GALLERY_QUANTITY = 6;

const TYPE_CARD = {
  CITY: {
    className: 'cities__card place-card',
    width: 260,
    height: 200,
    buttonFavorite: {
      className: 'place-card__bookmark-button button',
      span: 'To bookmarks',
    }
  },
  FAVORITES: {
    className: 'favorites__card place-card',
    width: 150,
    height: 110,
    buttonFavorite: {
      className: 'place-card__bookmark-button place-card__bookmark-button--active button',
      span: 'In bookmarks',
    }
  },
  NEAR: {
    className: 'near-places__card place-card',
    width: 260,
    height: 200,
    buttonFavorite: {
      className: 'place-card__bookmark-button place-card__bookmark-button--active button',
      span: 'In bookmarks',
    }
  },
};

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/',
}

enum MapType {
  City = 'cities__map',
  Offer = 'offer__map',
}

enum MarkType {
  Card = 'place-card__mark',
  Offer = 'offer__mark',
}

enum StarType {
  Card = 'place-card',
  Offer = 'offer',
  Review = 'reviews',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const RATING_STARS: readonly [string, string, string, string, string] = [
  'terribly', 'badly', 'not bad', 'good', 'perfect'
];

const COMMENT_DATE = 'MMMM YYYY';

const COMMENT_DATE_TIME = 'YYYY-MM-DD';

const MAP_MARKER_DEFAULT = 'img/pin.svg';

const MAP_MARKER_CURRENT = 'img/pin-active.svg';

const LAYER = {
  URL: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

const CITIES: TCityItems = [
  {
    city: 'Paris',
    active: false,
  },
  {
    city: 'Cologne',
    active: false,
  },
  {
    city: 'Brussels',
    active: false,
  },
  {
    city: 'Amsterdam',
    active: true,
  },
  {
    city: 'Hamburg',
    active: false,
  },
  {
    city: 'Dusseldorf',
    active: false,
  },
];

enum NameSpace {
  Offers = 'OFFERS',
  Offer = 'OFFER',
  NearPlaces = 'NEAR_PLACES',
  Favorites = 'FAVORITES',
  Reviews = 'REVIEWS',
  User = 'USER',
  Data = 'DATA',
}

const MAX_NEAR_PLACES_COUNT = 10;

const DEFAULT_COORDINATE_MAP = {
  latitude: 48.85661,
  longitude: 2.351499,
  zoom: 13
};

const DEFAULT_OFFER = {
  city: {
    name: '',
    location: DEFAULT_COORDINATE_MAP
  },
  previewImage: '',
  images: [],
  title: '',
  isFavorite: false,
  isPremium: false,
  rating: 0,
  type: '',
  bedrooms: 0,
  maxAdults: 0,
  price: 0,
  goods: [],
  host: {
    id: 0,
    name: '',
    isPro: false,
    avatarUrl: ''
  },
  description: '',
  location: {
    latitude: 0,
    longitude: 0,
    zoom: 0
  },
  id: '0'
};

export {
  FAVORITE_QUANTITY,
  MAX_RATING,
  TYPE_CARD,
  RATING_STARS,
  OFFER_GALLERY_QUANTITY,
  COMMENT_DATE,
  COMMENT_DATE_TIME,
  MAP_MARKER_DEFAULT,
  MAP_MARKER_CURRENT,
  LAYER,
  CITIES,
  MAX_NEAR_PLACES_COUNT,
  DEFAULT_COORDINATE_MAP,
  DEFAULT_OFFER,
  AppRoute,
  AuthorizationStatus,
  MapType,
  MarkType,
  StarType,
  NameSpace,
};
