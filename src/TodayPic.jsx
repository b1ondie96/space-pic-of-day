import React, { useState, useEffect } from "react";
import { Dialog } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { ExpandMore, dark } from "./cardExpand";

const TodayPic = ({ open, onClose }) => {
  const [pic, setPic] = useState({});
  const apikey = process.env.REACT_APP_APIKEY;
  const getPic = () => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apikey}`)
      .then((r) => r.json())
      .then((json) => setPic(json));
  };
  useEffect(() => {
    getPic();
  }, []);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth scroll="body">
      <ThemeProvider theme={dark}>
        <Card sx={{ maxWidth: "100%" }} raised>
          <CardHeader
            title={pic.title}
            subheader={`${pic.date} ${
              pic.copyright ? `© ${pic.copyright}` : ""
            }`}
          />
          <CardMedia
            component={pic.media_type === "image" ? "img" : "iframe"}
            image={pic.hdurl}
            alt={pic.title}
          />

          <CardActions disableSpacing>
            {pic.hdurl && (
              <Button size="small" href={pic.hdurl} target="_blank">
                Open
              </Button>
            )}

            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>{pic.explanation}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </ThemeProvider>
    </Dialog>
  );
};

export default TodayPic;
