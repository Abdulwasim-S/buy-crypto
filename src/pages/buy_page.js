import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buyCoin,
  checkBuyBit,
  checkSellBit,
  setBuyBit,
  setSellBit,
} from "../redux/Reducer/crypto.reducer";

const BuyPage = () => {
  const [amount, setAmount] = useState(0);
  const {
    current_crypto_price,
    wallet,
    buy,
    sell,
    buy_bit_value,
    sell_bit_value,
    eth,
  } = useSelector((state) => state.cryptoReducer);
  const dispatch = useDispatch();
  const handleSell = () => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("You can't cancel sell order once placed")) {
      return;
    }
    if (amount <= 0) {
      alert("Amount should not be 0 or less");
      return;
    }
    dispatch(setSellBit(amount));
    setAmount(0);
  };
  const handleBuy = () => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("You can't cancel buy order once placed")) {
      return;
    }
    if (amount <= 0) {
      alert("Amount should not be 0 or less");
      return;
    }
    dispatch(setBuyBit(amount));
    setAmount(0);
  };
  function checker() {
    console.log("Current Buy value", buy_bit_value);

    dispatch(checkBuyBit());
    dispatch(checkSellBit());
  }
  useEffect(() => {
    const checkerInterval = setInterval(checker, 3000);
    return () => clearInterval(checkerInterval);
  }, []);

  return (
    <div className="buy-container p-3 border border-1 border ">
      <div className="row p-1">
        <h4 className="col-md-4 text-success border border-3 border-black p-1">
          Current Price : $ {current_crypto_price}
        </h4>
        <h5 className="col-md-4">Wallet : $ {wallet}</h5>
        <h5 className="col-md-4">ETH : {eth}</h5>
        {sell_bit_value > 0 && (
          <h5 className="col-md-4">Sell : $ {sell_bit_value}</h5>
        )}
        {buy_bit_value > 0 && (
          <h5 className="col-md-4">Buy : $ {buy_bit_value}</h5>
        )}
      </div>
      <div className="row">
        <div className="form-group col-6 d-flex">
          <input
            type="number"
            class="form-control"
            id="amount"
            placeholder="$ 0.00"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        {!sell_bit_value > 0 ? (
          <button
            className="btn btn-warning col-3 border border-white border-5"
            onClick={handleSell}
            disabled={sell_bit_value === 0 && !sell}
          >
            Sell
          </button>
        ) : (
          <button
            className="btn btn-warning col-3 border border-white border-5"
            onClick={handleSell}
            disabled={true}
          >
            Sell
          </button>
        )}
        {!buy_bit_value > 0 ? (
          <button
            className="btn btn-success col-3 border border-white border-5"
            onClick={handleBuy}
            disabled={buy_bit_value === 0 && !buy}
          >
            Buy
          </button>
        ) : (
          <button
            className="btn btn-success col-3 border border-white border-5"
            onClick={handleBuy}
            disabled={true}
          >
            Buy
          </button>
        )}
      </div>
    </div>
  );
};

export default BuyPage;
