import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const Title = styled(Typography)({
  flex: 1,
  color: "gold",
  fontFamily: "Montserrat",
  fontWeight: "bold",
  cursor: "pointer",
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fff'
    },
    mode: 'dark'
  },
});

const Header = () => {
  const navigate = useNavigate();
  const {currency, setCurrency} = CryptoState()
  console.log(currency);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Title onClick={() => navigate("/")} variant="h6">Crypto Hunter</Title>
          <Select variant="outlined" style={{ width: 100, height: 40, marginRight: 15 }} value={currency} onChange={(e)=>setCurrency(e.target.value)}>
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'INR'}>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
