import { useEffect } from "react";
import "./App.css";
import {
  checkBuyBit,
  checkSellBit,
  getCryptoData,
  setBuySellState,
} from "./redux/Reducer/crypto.reducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ChartPage from "./pages/chart_page";
import BuyPage from "./pages/buy_page";
import HeaderPage from "./pages/header_page";
import FooterPage from "./pages/footer_page";

function App() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.cryptoReducer);
  const getDate = async () => {
    try {
      await axios
        .get(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        )
        .then((res) => {
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
    <>
      <HeaderPage />
      {status && <BuyPage />}
      {!status && <h1 className="text-center">Loading...</h1>}
      <ChartPage />
      <FooterPage />
    </>
  );
}

export default App;
