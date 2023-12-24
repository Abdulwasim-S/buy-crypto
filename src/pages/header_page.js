import React from "react";
import logo from "../images/logo.png";

const HeaderPage = () => {
  return (
    <div className="header-page w-100 py-3">
      <h1 className=" heading text-center">
        {`Crypto-ETH`}
        <img className="eth-logo" src={logo} alt="logo" />
      </h1>
    </div>
  );
};

export default HeaderPage;
