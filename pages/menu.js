import clientPromise from "../lib/mongodb";
import { useState } from "react";

import Button from "@mui/material/Button";

export default function Menu({ recipes }) {
  return (
    <div>
      <h1>Recipes</h1>

      <ul>
        {recipes.map((recipe) => (
          <li>
            <h2>{recipe.name}</h2>
            <h3>{recipe.ingredient}</h3>
            <p>{recipe.cookingTime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const client = await clientPromise;

    const db = client.db("recipesApp");

    const recipes = await db.collection("recipe").find({}).limit(20).toArray();

    return {
      props: { recipes: JSON.parse(JSON.stringify(recipes)) },
    };
  } catch (e) {
    console.error(e);
  }
}
