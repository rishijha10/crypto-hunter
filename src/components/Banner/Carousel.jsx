import { styled } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CoinList } from "../../config/api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const CarouselDiv = styled("div")({
  height: "50%",
  display: "flex",
  alignItems: "center",
});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get(CoinList());
    // console.log(data.data.coins);
    setTrending(data.data.coins.slice(0, 8));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const items = trending.length > 0 && trending.map((coin) => {
    let profit = coin?.change >= 0;
    // console.log(profit);
    return (
      <Link
        key={coin.uuid}
        to={`/coins/${coin.uuid}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          textTransform: "uppercase",
          color: "white",
        }}
      >
        <img
          src={coin?.iconUrl}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {Number(coin?.change).toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          $ {numberWithCommas(Number(coin?.price).toFixed(2))}
        </span>
      </Link>
    );
  }) || [];

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <CarouselDiv>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </CarouselDiv>
  );
};

export default Carousel;
