import { TariffResponse } from './../../types/tariff';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addTariff,
  deleteTariff,
  getTariffs,
  updateTariff,
} from './apiActions';

type InitialState = {
  tariffs: TariffResponse[];
};

const initialState: InitialState = {
  tariffs: [],
};

export const tariffSlice = createSlice({
  name: 'tariffs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getTariffs.fulfilled.type,
        (state, action: PayloadAction<TariffResponse[]>) => {
          state.tariffs = action.payload;
        },
      )
      .addCase(
        addTariff.fulfilled.type,
        (state, action: PayloadAction<TariffResponse>) => {
          state.tariffs = [...state.tariffs, action.payload];
        },
      )
      .addCase(
        updateTariff.fulfilled.type,
        (state, action: PayloadAction<TariffResponse>) => {
          const updatedTariffIndex = state.tariffs.findIndex(
            (tariff) => tariff.id === action.payload.id,
          );
          state.tariffs = [
            ...state.tariffs.slice(0, updatedTariffIndex),
            action.payload,
            ...state.tariffs.slice(updatedTariffIndex + 1),
          ];
        },
      )
      .addCase(
        deleteTariff.fulfilled.type,
        (state, action: PayloadAction<number>) => {
          const deletedTariffIndex = state.tariffs.findIndex(
            (tariff) => tariff.id === action.payload,
          );
          state.tariffs = [
            ...state.tariffs.slice(0, deletedTariffIndex),
            ...state.tariffs.slice(deletedTariffIndex + 1),
          ];
        },
      );
  },
});
