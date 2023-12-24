import { createSlice } from "@reduxjs/toolkit";

const cryptoslice = createSlice({
  name: "crypto",
  initialState: {
    status: true,
    current_crypto_price: 0,
    buy_bit_value: 0,
    sell_bit_value: 0,
    weekly_graph_data: [],
    wallet: 10000,
    eth: 1,
    buy: false,
    sell: false,
  },
  reducers: {
    getCryptoData(state, action) {
      state.current_crypto_price = action.payload;
    },
    setBuySellState(state) {
      state.wallet < state.current_crypto_price
        ? (state.buy = false)
        : (state.buy = true);

      state.eth <= 0 ? (state.sell = false) : (state.sell = true);
    },
    setBuyBit(state, action) {
      state.buy_bit_value = +action.payload;
      state.wallet = state.wallet - action.payload;
    },
    setSellBit(state, action) {
      if (action.payload === 0) {
        state.wallet = state.wallet + state.current_crypto_price;
        state.buy_bit_value = 0;
        return;
      }
      state.buy_bit_value = action.payload;
      state.eth = state.eth - 1;
      setBuySellState();
    },
    buyCoin(state, action) {
      if (action.payload === "buy") {
        if (state.current_crypto_price <= state.wallet) {
          state.eth = state.eth + 1;
          state.wallet = state.wallet - state.current_crypto_price;
          state.sell = true;
          state.wallet < state.current_crypto_price
            ? (state.buy = false)
            : (state.buy = true);
        }
      }
      if (action.payload === "sell") {
        if (state.eth > 0) {
          state.eth = state.eth - 1;
          state.wallet = state.wallet + state.current_crypto_price;
          if (state.eth <= 0) {
            state.sell = false;
          }
          state.wallet < state.current_crypto_price
            ? (state.buy = false)
            : (state.buy = true);
        }
      }
    },
  },
});
export const {
  getCryptoData,
  buyCoin,
  setBuySellState,
  setSellBit,
  setBuyBit,
} = cryptoslice.actions;
export default cryptoslice.reducer;
