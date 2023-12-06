import {
  commerce,
  datatype,
  date,
  image,
  internet,
  lorem,
} from 'faker';

import { TCity, TCityName, TLocation, TOffer, TOfferPreview, TOffersPreview, TState } from '../types';
import { TReview, TReviews } from '../types/review';
import { TUser } from '../types/user';
import { address } from 'faker/locale/en';
import { TUserData } from '../types/user';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';

const makeFakeUser = (): TUser => ({
  name: internet.userName(),
  isPro: datatype.boolean(),
  avatarUrl: internet.avatar(),
});

const makeFakeUserData = (): TUserData => ({
  name: internet.userName(),
  isPro: datatype.boolean(),
  avatarUrl: internet.avatar(),
  email: internet.email(),
  token: datatype.string(),
});

const makeFakeLocation = (): TLocation => ({
  zoom: datatype.number({ min: 5, max: 15 }),
  latitude: datatype.number({ min: 5, max: 6, precision: 0.0001 }),
  longitude: datatype.number({ min: 4, max: 10, precision: 0.001 }),
});

const makeFakeCity = (): TCity => ({
  name: address.cityName() as TCityName,
  location: makeFakeLocation(),
});

const makeFakeOfferPreview = (): TOfferPreview => ({
  id: datatype.string(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  title: lorem.word(10),
  type: commerce.product(),
  price: datatype.number(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.1 }),
  previewImage: image.imageUrl(),
  city: makeFakeCity(),
  location: makeFakeLocation(),
});

const makeFakeOffer = (): TOffer => ({
  id: datatype.string(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  title: lorem.word(10),
  type: commerce.product(),
  price: datatype.number(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.1 }),
  city: makeFakeCity(),
  location: makeFakeLocation(),
  images: Array.from({ length: 2 }, () =>
    image.imageUrl(260, 200, 'cat', true)
  ),
  host: makeFakeUser(),
  bedrooms: datatype.number({ min: 1, max: 10 }),
  maxAdults: datatype.number({ min: 1, max: 5 }),
  goods: [commerce.product()],
  description: commerce.productDescription()
});

const makeFakeOffersPreview = (): TOffersPreview =>
  Array.from({ length: 12 }, makeFakeOfferPreview);

const makeFakeNearbyPlacesPreview = (): TOffersPreview =>
  Array.from({ length: 3 }, makeFakeOfferPreview);

const makeFakeReview = (): TReview => ({
  id: datatype.string(),
  user: makeFakeUser(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.1 }),
  comment: lorem.sentence(),
  date: String(date.recent()),
});

const makeFakeReviews = (): TReviews =>
  Array.from({ length: 5 }, makeFakeReview);

const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

type AppThunkDispatch = ThunkDispatch<TState, ReturnType<typeof createAPI>, Action>;

export { makeFakeReviews, makeFakeNearbyPlacesPreview, makeFakeOffersPreview, makeFakeUserData, makeFakeOffer, extractActionsTypes, type AppThunkDispatch, makeFakeOfferPreview, makeFakeReview };
