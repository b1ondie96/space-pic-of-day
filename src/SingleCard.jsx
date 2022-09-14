import React, { useState } from 'react';
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

export default function SingleCard(i) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
 
  return (
    <ThemeProvider theme={dark}>
      <Card sx={{ maxWidth: 400 }} raised>
        <CardHeader
          title={i.title}
          subheader={`${i.date} ${i.copyright ? `© ${i.copyright}` : ""}`}
        />
        <CardMedia
          component={i.media_type === "image" ? "img" : "iframe"}
          height="250"
          image={i.url}
          alt={i.title}
        />

        <CardActions disableSpacing>
          {i.hdurl && (
            <Button size="small" href={i.hdurl} target="_blank">
              HD Version
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
            <Typography paragraph>{i.explanation}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </ThemeProvider>
  );
}
