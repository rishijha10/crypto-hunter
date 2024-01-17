import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import { Typography, styled } from "@mui/material";
import CoinInfo from "../components/CoinInfo";
import ReactHtmlParser from "react-html-parser";
// import CoinInfo2 from "../";

const CryptoContainer = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));
const SideBar = styled("div")(({ theme }) => ({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
}));
const StyledHeading = styled(Typography)({
  fontWeight: "bold",
  marginBottom: 20,
  fontFamily: "Montserrat",
});
const StyledMarketDataDiv = styled("div")(({ theme }) => ({
  alignSelf: "start",
  padding: theme.spacing(3),
  paddingTop: theme.spacing(1),
  width: "100%",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "space-around",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.down("xs")]: {
    alignItems: "flex-start",
  },
}));

const numberWithCommas = (x) => {
  if (x === undefined || x === null) {
    return ""; // or some default value depending on your use case
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const CryptoPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  // const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    console.log(data.data.coin)
    setCoin(data.data.coin);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  return (
    <CryptoContainer>
      <SideBar>
        <img
          src={coin?.iconUrl}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <StyledHeading variant="h3">{coin?.name}</StyledHeading>
        <Typography
          variant="subtitle1"
          style={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify",
          }}
        >
          {ReactHtmlParser(coin?.description.split(". ")[0])}.
        </Typography>
        <StyledMarketDataDiv>
          <span style={{ display: "flex" }}>
            <StyledHeading variant="h5">Rank:</StyledHeading>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(Number(coin?.rank))}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <StyledHeading variant="h5">Current Price:</StyledHeading>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              ${" "}
              {numberWithCommas(
                Number(coin?.price).toFixed(2)
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <StyledHeading variant="h5">Market Cap:</StyledHeading>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              ${" "}
              {numberWithCommas(
                Number(coin?.marketCap)
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </StyledMarketDataDiv>
      </SideBar>
      {coin && <CoinInfo coin={coin} />}
    </CryptoContainer>
  );
};
