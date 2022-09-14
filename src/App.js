import RandomPics from "./RandomPics";
import "./App.css";
import React, { useState, useEffect } from "react";

import TodayPic from "./TodayPic";
import { Button } from "@mui/material";

function App() {
  document.title = "Astronomy pictures";

  const [stars, setStars] = useState();
  const [dialogOpen, setdialogOpen] = useState(false);

  const onClose = () => {
    setdialogOpen(false);
  };

  // STAR GENERATOR
  useEffect(() => {
    function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const starColors = [
      "#5edbd7",
      "#afc9ff",
      "#ffe5cf",
      "#e34222",
      "#a1dcf0",
      "#fff",
    ];
    let result = "";
    for (let i = 0; i < 250; i++) {
      result += `${randomNumber(-50, 50)}vw ${randomNumber(
        -50,
        50
      )}vh ${randomNumber(0, 3)}px ${randomNumber(0, 3)}px ${
        starColors[randomNumber(0, 5)]
      },`;
    }
    setStars(result.substring(0, result.length - 1));
  }, []);
  return (
    <>
      <div className="star" style={{ boxShadow: stars }}></div>
      <Button variant="contained" onClick={() => setdialogOpen(true)}>
        Today's picture
      </Button>
      <TodayPic onClose={onClose} open={dialogOpen} />
      <RandomPics />
    </>
  );
}

export default App;
