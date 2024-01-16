import { Typography, styled } from "@mui/material";
import Carousel from "./Carousel";

const BannerDiv = styled("div")({
  backgroundImage: "url(./banner2.jpg)",
});
const BannerContent = styled("div")({
  height: 400,
  display: "flex",
  flexDirection: "column",
  paddingTop: 25,
  justifyContent: "space-around"
});
const TagLine = styled("div")({
  display: "flex",
  height: "40%",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
});
const Banner = () => {
  return (
    <BannerDiv>
        <BannerContent>
          <TagLine>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
          </TagLine>
          <Carousel />
        </BannerContent>
    </BannerDiv>
  )
}

export default Banner