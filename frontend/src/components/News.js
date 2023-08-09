import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import "animate.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "black",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  display: "flex",
  alignItems: "center",
  paddingTop: "20px",
  paddingBottom: "20px",
}));

const Image = styled("img")({
  marginRight: "10px",
  width: "100px",
  height: "100px",
  borderRadius: "5px",
});

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

function News() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/articles")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const handleSaveArticle = (article) => {
    fetch("http://localhost:5000/save-article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Article saved:", data);
      })
      .catch((err) => {
        console.log("Error saving article:", err);
      });
  };

  if (isLoading) {
    return (
      <div class="center-container">
        <div class="loading">
          <div class="typewriter">
            <div class="slide">
              <i></i>
            </div>
            <div class="paper"></div>
            <div class="keyboard"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="news">
      <h1 className="animate__bounceIn">Trending News</h1>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {articles.map((article, index) => (
            <Grid item sm={12} xs={12} md={6} key={index}>
              <Item className="animate__animated animate__fadeIn">
                <Image
                  sx={{ objectFit: "cover" }}
                  src={article.urlToImage}
                  alt="News"
                />
                <div>
                  <p>
                    <Link
                      to={article.url}
                      style={linkStyle}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.title}
                    </Link>
                  </p>
                  <TurnedInIcon
                    sx={{
                      color: "#fff",
                      cursor: "pointer",
                      paddingLeft: "5px",
                    }}
                    onClick={() => handleSaveArticle(article)}
                  />
                </div>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default News;
