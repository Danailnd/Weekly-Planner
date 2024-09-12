import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import useUser from "../lib/useUser";
import clientPromise from "../lib/mongodb";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";

const MultiColumnsBase = dynamic(import("../src/Components/MultiColumnsBase"));

export default function Calendar({ fromDB }) {
  const { user, mutateUser } = useUser({
    redirectTo: "/login",
  });

  let userId = user?._id;
  let columnsFromDB = fromDB?.workplace?.columns;

  const [winReady, setwinReady] = useState(false);

  useEffect(() => {
    setwinReady(true);
  }, []);

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
        <>
          <MultiColumnsBase userId={userId} columnsFromDB={columnsFromDB} />
        </>
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

    const db = client.db("ObrazowDom");

    let fromDB = null;
    if (user) {
      fromDB = await db.collection("workplace").findOne({ userId: user._id });
    }
    return {
      props: { fromDB: JSON.parse(JSON.stringify(fromDB)) },
    };
  } catch (e) {
    console.error(e);
  }
},
sessionOptions);
