import React, { useState, useEffect } from "react";

import SingleCard from "./SingleCard";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollToTop from "react-scroll-up";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import SingleSkeleton from "./SingleSkeleton";

const RandomPics = () => {
  
  const [pic, setPic] = useState(JSON.parse(window.sessionStorage.getItem('pics'))||[]);
  const imageCount = 30;
  
  const [infScroll, setInfScroll] = useState(true);
  const [loading, setLoading] = useState(true);

  const apikey = process.env.REACT_APP_APIKEY;

  const getPic = () => {
    if (pic.length > 500) {
      setInfScroll(false);
      return;
    } else {
      setLoading(true)
      fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apikey}&count=${imageCount}`
      )
        .then((r) => r.json())
        .then((json) => {
          for (let i = 0; i < json.length; i++) {
            setPic((p) => [...p, json[i]]);
          }
        }).finally(()=>setLoading(false))
       
    }
  };
 
    useEffect(() => {
      window.sessionStorage.setItem('pics',JSON.stringify(pic))
    }, [pic]);
  
  useEffect(() => {
    if(pic.length===0){
    getPic();}
  },[]);

 console.log('hi',pic);

  return (
    <>
      <div className="topscroll">
        <ScrollToTop
          showUnder={200}
          style={{
            position: "fixed",
            bottom: 25,
            right: 15,
            cursor: "pointer",
            transitionDuration: "0.2s",
            transitionTimingFunction: "linear",
            transitionDelay: "0s",
            zIndex: "666",
            color: "#818181",
          }}
        >
          <ArrowCircleUpIcon style={{ width: "3rem", height: "3rem" }} />
        </ScrollToTop>
      </div>

      <div className="bg">
        
        <InfiniteScroll
          dataLength={pic.length}
          next={getPic}
          hasMore={infScroll}
        >
          <div>
            <div className="apod">
              {pic.map((i, o) => (
                <SingleCard {...i} key={o} />
              ))}
              {loading && [...Array(30)].map((i, o) => (
                <SingleSkeleton key={o} />
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default RandomPics;
