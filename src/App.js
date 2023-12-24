import { useEffect } from "react";
import "./App.css";
import {
  checkBuyBit,
  checkSellBit,
  getCryptoData,
  setBuyBit,
  setBuySellState,
  setSellBit,
} from "./redux/Reducer/crypto.reducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ChartPage from "./pages/chart_page";
import BuyPage from "./pages/buy_page";
import WalletPage from "./pages/wallet_page";

function App() {
  const dispatch = useDispatch();
  const { current_crypto_price, buy_bit_value, sell_bit_value } = useSelector(
    (state) => state.cryptoReducer
  );
  const getDate = async () => {
    console.log("hi");
    try {
      await axios
        .get(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        )
        .then((res) => {
          console.log(res.data.ethereum.usd);
          dispatch(getCryptoData(+res.data.ethereum.usd));
          dispatch(setBuySellState());
          dispatch(checkBuyBit());
          dispatch(checkSellBit());
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getDate();
    }, 12000);
    getDate();
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="App">
      <WalletPage />
      <BuyPage />
    </div>
  );
}

export default App;
