import clientPromise from "../../../lib/mongodb";
import RecipeDataType from "../../../src/models";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("WeeklyPlanner");
    // console.log(req.body);

    const workplace = await db.collection("workplace").updateOne(
      { userId: req.body.userId },
      {
        $set: {
          workplace: req.body,
        },
      },
      { upsert: true }
    );
    // const { name, ingredient, cookingTime } = req.body;

    res.json(workplace);
  } catch (e) {
    console.error(e);
  }
};
