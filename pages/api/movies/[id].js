import clientPromise from "../../../lib/mongodb";
import mongoose from "mongoose";

export default async (req, res) => {
  try {
    const { id } = req.query;
    const objectId = mongoose.Types.ObjectId(id);

    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const movies = await db
      .collection("movies")
      .find({ _id: objectId })
      .toArray();
    res.json(movies);
  } catch (e) {
    console.error(e);
  }
};
