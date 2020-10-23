import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Stack,
  Heading,
  Text,
  Link,
  Icon
} from "@chakra-ui/core";
import axios from "axios";
export default function Home({ ThemeProvider }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState();
  const [ratings, setRatings] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/movies/")
      .then((res) => {
        console.log(res);
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });

    axios
      .get("http://localhost:5000/ratings/")
      .then((res) => {
        console.log("ratings", res);
        setRatings(res.data);
      })
      .catch((err) => {
        console.log("ratings error", err);
      });
  }, []);
  return (
    <Stack maxWidth="70vw" spacing={8} align="center" direction="row" shouldWrapChildren="true" >
      {error && <span>An error has occurred {error}</span>}
      {movies.map((movie) => (
        <Box
          p={5}
          maxW="sm"
          shadow="md"
          borderWidth="1px"
          flex="1"
          round="md"
          overflow="hidden"
          className="movies"
          p={4}
          key={movie.id}
        >
          <Link color="gold" as={RouterLink} to={`/movies/${movie.id}`}>
            <Heading as="h1" size="2x1">
              {movie.id}. {movie.name}
            </Heading>
          </Link>
          <Heading as="sm" size="3x2">{movie.year}</Heading>
          <Box alignItems="center">
          <List as="ul">
            {movie.categories.split(",").map((category) => (
              <ListItem display="inline">
                <ListIcon>{category}</ListIcon>
              </ListItem>
            ))}
          </List>
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            <p>{movie.runtime} minutes</p>
            <p>{movie.summary}</p>
            <p>
              Rating:{" "}
              {Array(5)
                .fill("")
                .map((_, i) => (
                    <Icon 
                    name="star"
                    color={i < Math.round(
                        ratings
                          .filter((rating) => rating.movie_id === movie.id)
                          .reduce((acc, cv) => {
                            return acc + cv.rating;
                          }, 0) /
                          ratings.filter((rating) => rating.movie_id === movie.id)
                            .length
                      ) ? "gold" : "gray.300"}>

                    </Icon>
                ))
              }
            </p>
          </Box>
        </Box>
      ))}
    </Stack>
  );
}
