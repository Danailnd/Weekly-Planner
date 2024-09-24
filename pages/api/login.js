import clientPromise from "../../lib/mongodb";
import bcrypt from "bcrypt";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

// export default withIronSessionApiRoute(loginRoute, sessionOptions);

export default withIronSessionApiRoute(async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("WeeklyPlanner");

    const { email, username, password, familyAccount } = req.body;

    const user = await db
      .collection("users")
      .findOne({ username: req.body.username });

    if (user) {
      const cmp = await bcrypt.compare(req.body.password, user.password);
      if (cmp) {
        //   ..... further code to maintain authentication like jwt or sessions

        req.session.user = user;
        await req.session.save();

        res.json("Auth Successful");
      } else {
        res.json("Wrong password.");
      }
    } else {
      res.json("Username not found");
    }
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);
