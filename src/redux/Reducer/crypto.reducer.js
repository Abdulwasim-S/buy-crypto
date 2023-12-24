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
    checkBuyBit(state) {
      if (state.buy_bit_value <= 0) {
        return;
      }
      state.eth = state.eth + 1;
      state.buy_bit_value = 0;
    },
    setSellBit(state, action) {
      state.sell_bit_value = action.payload;
      state.eth = state.eth - 1;
    },
    checkSellBit(state) {
      if (state.sell_bit_value <= 0) {
        return;
      }
      state.sell_bit_value = 0;
    },
  },
});
export const {
  getCryptoData,
  setBuySellState,
  setSellBit,
  setBuyBit,
  checkBuyBit,
  checkSellBit,
} = cryptoslice.actions;
export default cryptoslice.reducer;
