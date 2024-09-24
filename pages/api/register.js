import clientPromise from "../../lib/mongodb";
import bcrypt from "bcrypt";

const saltRounds = 10;

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("WeeklyPlanner");

    const { email, username, password, familyAccount } = req.body;

    const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);

    const user = await db.collection("users").insertOne({
      email: email,
      username: username,
      password: hashedPwd,
    });

    res.json(user);
  } catch (e) {
    console.error(e);
  }
};
