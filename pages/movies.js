import clientPromise from "../lib/mongodb";
import { useState } from "react";

import Button from "@mui/material/Button";

export default function Movies({ movies }) {
  const [movieTest, setMovieTest] = useState([]);
  async function getMovie() {
    const res = await fetch(
      "http://localhost:3000/api/movies/573a1394f29313caabcdfa3e"
    );
    const json = await res.json();
    console.log(json);
    setMovieTest(json);
  }

  return (
    <div>
      <h1>Top 20 Movies of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <div>
        <h2>{movieTest[0]?.title}</h2>
        <Button onClick={getMovie}>TEST</Button>
      </div>

      <ul>
        {movies.map((movie) => (
          <li>
            <h2>{movie.title}</h2>
            <h3>{movie.metacritic}</h3>
            <p>{movie.plot}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const client = await clientPromise;

    const db = client.db("sample_mflix");

    const movies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray();

    return {
      props: { movies: JSON.parse(JSON.stringify(movies)) },
    };
  } catch (e) {
    console.error(e);
  }
}
