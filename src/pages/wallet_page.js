import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import logo from "../images/logo.png";

const WalletPage = () => {
  const { current_crypto_price, wallet, eth } = useSelector(
    (state) => state.cryptoReducer
  );
  return (
    <Navbar expand="lg" className=" bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">
          <h1>
            {`Crypto-ETH`}
            <img className="eth-logo" src={logo} alt="logo" />
          </h1>
          <h5>Current Price : $ {current_crypto_price.toFixed(2)}</h5>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <h5>Wallet : $ {wallet.toFixed(2)}</h5>
            <h5>ETH : {eth}</h5>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default WalletPage;
