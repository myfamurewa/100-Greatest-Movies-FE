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
  Icon,
  Flex
} from "@chakra-ui/core";
import axios from "axios";
export default function Home() {
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
    // <Flex maxWidth="70vw" spacing={8} align="center" direction="row" shouldWrapChildren="true" >
    <Flex align="center" wrap="true" direction="row" justify="space-around">
      {error && <span>An error has occurred {error}</span>}
      {movies.map((movie) => (
        <Box
          p={5}
          shadow="lg"
          borderWidth="5px"
          flex="1"
          round="md"
          overflow="hidden"
          className="movies"
          margin=".5%"
          key={movie.id}
          rounded="md"
          background="linear-gradient( rgba(9,171,255,1) 0%, rgba(5,89,128,1) 49%, rgba(67,76,78,1) 100%);"
        >
          <Text color="gold" fontWeight="bold" fontSize="1.3em" position="relative" right="45%" bottom="17%">{movie.id}</Text>
          <Link as={RouterLink} to={`/movies/${movie.id}`} color="#9ac7fa" fontFamily="Montserrat"  >
            <Heading as="h1" size="2x1">
               {movie.name}
            </Heading>
          </Link>
          <List as="ul" >
            <ListItem color="white" display="inline"><ListIcon><Heading as="sm" size="3x2">({movie.year})</Heading></ListIcon></ListItem>
            {movie.categories.split(",").map((category) => (
              <ListItem color="white" fontWeight="bold" display="inline">
                <ListIcon>{category}</ListIcon>
              </ListItem>
            ))}
          </List>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            <Text color="white">{movie.runtime} minutes</Text>
            <Text color="white">{movie.summary}</Text>
            <Text color="white">
              {/* Rating:{" "} */}
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
            </Text>
          </Box>
        </Box>
      ))}
    </Flex>
  );
}
