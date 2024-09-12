// import clientPromise from "../lib/mongodb";
// import { useState } from "react";
import React from "react";
import { useState } from "react";
import RecipeDataType from "../src/models";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

export default () => {
  // const navigate = useNavigate();
  const formData: RecipeDataType = { firstName: "", lastName: "", age: "" };
  const [responseBody, setResponseBody] = useState<RecipeDataType>(formData);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setResponseBody({ ...responseBody, [name]: value });
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(responseBody);
    await fetch("http://localhost:3000/api/recipe/save", {
      method: "POST",
      body: JSON.stringify(responseBody),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    // navigate("/menu"); //navigate is outdated and bad.  Find a better replacement
    //Form submission happens here
  };
  return (
    <>
      <h2>Create a Recipe</h2>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input
            id="name"
            name="name"
            onChange={(e) => inputChangeHandler(e)}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="ingredient">Ingredient</label>
        </div>
        <div>
          <input
            id="ingredient"
            name="ingredient"
            onChange={(e) => inputChangeHandler(e)}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="cookingTime">Cooking Time</label>
        </div>
        <div>
          <input
            id="cookingTime"
            name="cookingTime"
            onChange={(e) => inputChangeHandler(e)}
            type="number"
          />
        </div>
        <input type="submit" />
      </form>
    </>
  );
};
