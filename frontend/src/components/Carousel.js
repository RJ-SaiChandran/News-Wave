import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ImageCarousel.css";

const ImageCarousel = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/articles/latest")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setArticles(data.slice(0, 5));
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
      });
  }, []);

  return (
    <div className="carousel-wrapper">
      <p>Breaking News</p>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
      >
        {articles.map((article, index) => (
          <div key={index} className="carousel-slide">
            <img
              src={article.urlToImage}
              alt="News"
              style={{
                maxWidth: "900px",
                maxHeight: "730px",
                objectFit: "contain",
              }}
            />
            <div className="carousel-caption">{article.title}</div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
