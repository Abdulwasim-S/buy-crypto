import { createSlice } from "@reduxjs/toolkit";

const cryptoslice = createSlice({
  name: "crypto",
  initialState: {
    status: false,
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
      state.status = true;
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
      if (state.buy_bit_value >= state.current_crypto_price) {
        state.eth = state.eth + 1;
        state.buy_bit_value = 0;
      }
    },
    setSellBit(state, action) {
      state.sell_bit_value = action.payload;
      state.eth = state.eth - 1;
    },
    checkSellBit(state) {
      if (state.sell_bit_value <= 0) {
        return;
      }
      if (state.sell_bit_value <= state.current_crypto_price) {
        state.wallet = state.wallet + state.current_crypto_price;
        state.sell_bit_value = 0;
      }
    },
    setWeeklyGraphData(state, action) {
      const data = action.payload.map((ele, idx) => {
        let temp = {
          Time: new Date(ele[0]).toLocaleTimeString("en-in"),
          Price: ele[1],
        };
        return temp;
      });
      state.weekly_graph_data = data;
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
  setWeeklyGraphData,
} = cryptoslice.actions;
export default cryptoslice.reducer;
