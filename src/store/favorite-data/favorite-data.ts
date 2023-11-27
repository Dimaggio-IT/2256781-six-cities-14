import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TOffersPreview } from '../../types';
import { getAsyncFavorites, postAsyncFavorite } from '..';

type TFavoritesData = {
  favorites: TOffersPreview;
  favoritesStatus: {
    status: boolean | null;
    message: string;
  };
  markStatus: {
    status: boolean | null;
    message: string;
  };
};

const initialState: TFavoritesData = {
  favorites: [],
  favoritesStatus: {
    status: null,
    message: '',
  },
  markStatus: {
    status: null,
    message: '',
  },
};

const favoriteData = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAsyncFavorites.pending, (state) => {
        state.favoritesStatus.status = null;
        state.favoritesStatus.message = 'pending';
      })
      .addCase(getAsyncFavorites.fulfilled, (state, action) => {
        state.favoritesStatus.status = true;
        state.favoritesStatus.message = 'fulfilled';
        state.favorites = action.payload;
      })
      .addCase(getAsyncFavorites.rejected, (state) => {
        state.favoritesStatus.status = false;
        state.favoritesStatus.message = 'Unknown error';
      })
      .addCase(postAsyncFavorite.pending, (state) => {
        state.markStatus.status = null;
        state.markStatus.message = 'pending';
      })
      .addCase(postAsyncFavorite.fulfilled, (state, action) => {
        state.markStatus.status = true;

        if (action.payload.isFavorite) {
          state.favorites.push(action.payload);
        } else {
          state.favorites = state.favorites.filter(({ id }) => id !== action.payload.id);
        }
      })
      .addCase(postAsyncFavorite.rejected, (state, action) => {
        state.markStatus.status = false;

        if (action.payload) {
          state.markStatus.message = `${action.payload.message}`;
        } else {
          state.markStatus.message = 'Unknown error during asynchronous operation of mark/unmark a favorite offer on the server';
        }
      });
  },
});

export { favoriteData };
