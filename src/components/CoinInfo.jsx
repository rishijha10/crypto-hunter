import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import { styled } from "@mui/material";
import axios from "axios";
// import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState("24h");
  const [loading, setLoading] = useState(true);

  const StyledDiv = styled("div")({
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    "@media (max-width: 960px)": {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  });

  const fetchHistoricData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(HistoricalChart(coin?.uuid, days));
      console.log(data.data.history[0].price);
      setHistoricData(data.data.history);
    } catch (error) {
      console.error("Error fetching historic data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {}, [coin]);
  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  // Function to create the chart
  const createChart = () => {
    const ctx = document.getElementById("coin-chart");

    // Check if the chart already exists, destroy it before creating a new one
    if (ctx && ctx.chart) {
      ctx.chart.destroy();
    }

    // Create a new Line chart
    new Chart(ctx, {
      type: "line",
      data: {
        labels: historicData.map((coin) => {
          let date = new Date(coin.timestamp * 1000);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              : `${date.getHours()}:${date.getMinutes()} AM`;
          return days === "24h" ? time : date.toLocaleDateString();
        }),
        datasets: [
          {
            data: historicData.map((coin) => coin.price),
            label: `Price ( Past ${days} Days ) in $`,
            borderColor: "#EEBC1D",
          },
        ],
      },
      options: {
        elements: {
          point: {
            radius: 1,
          },
        },
      },
    });
  };

  // Call createChart whenever historicData changes
  useEffect(() => {
    if (historicData) {
      createChart();
    }
  }, [historicData]);

  return (
    <ThemeProvider theme={darkTheme}>
      <StyledDiv>
        {loading ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <canvas id="coin-chart"></canvas>
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => {
                return (
                  <SelectButton
                    key={day.value}
                    onClick={() => {
                      setDays(day.value);
                      setLoading(false);
                    }}
                    selected={day.value === days}
                  >
                    {day.label}
                  </SelectButton>
                );
              })}
            </div>
          </>
        )}
      </StyledDiv>
    </ThemeProvider>
  );
};

export default CoinInfo;
