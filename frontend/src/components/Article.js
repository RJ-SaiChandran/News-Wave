import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import "./article.css";
import Footer from "./footer";

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

function Article() {
  const [getArticles, setArticle] = useState([]);
  const { name } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:5000/get-article/${name}`)
      .then((response) => response.json())
      .then((data) => {
        setArticle(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [name]);

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
    <>
      <Navbar />
      <Container>
        <div className="news">
          <h1>Latest News in {name}</h1>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {getArticles.map((article, index) => (
                <Grid item sm={12} xs={12} md={6} key={index}>
                  <Item>
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
                    </div>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default Article;
