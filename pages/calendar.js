import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import useUser from "../lib/useUser";
import clientPromise from "../lib/mongodb";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";

const MultiColumnsBase = dynamic(import("../src/Components/MultiColumnsBase"));

export default function Calendar({ fromDB }) {
  const { user } = useUser({
    redirectTo: "/login",
    redirectIfFound: false,
  });

  const userId = user?._id;
  const columnsFromDB = fromDB?.workplace?.columns;

  // Use winReady state to determine if the window is ready
  const [winReady, setWinReady] = useState(false);

  // Use effect to set winReady to true after component mounts
  useEffect(() => {
    setWinReady(true);
  }, []); // Empty dependency array means this effect runs only once

  return (
    <div
      sx={{
        width: "100%",
        height: "99%",
        overflow: "auto",
        paddingRight: "15px",
      }}
    >
      {winReady ? (
        <MultiColumnsBase userId={userId} columnsFromDB={columnsFromDB} />
      ) : null}
    </div>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  try {
    const user = req.session.user;
    const client = await clientPromise;

    const db = client.db("WeeklyPlanner");

    let fromDB = null;
    if (user) {
      fromDB = await db.collection("workplace").findOne({ userId: user._id });
    }
    return {
      props: { fromDB: JSON.parse(JSON.stringify(fromDB)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { fromDB: null }, // Return null or handle the error appropriately
    };
  }
},
sessionOptions);
