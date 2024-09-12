import clientPromise from "../../../lib/mongodb";
import RecipeDataType from "../../../src/models";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("recipesApp");

    const { name, ingredient, cookingTime } = req.body;

    const recipe = await db.collection("recipe").insertOne({
      name: name,
      ingredient: ingredient,
      cookingTime: cookingTime,
    });

    res.json(recipe);
  } catch (e) {
    console.error(e);
  }
};
