import Head from "next/head";
import clientPromise from "../lib/mongodb";

export default function Home({ isConnected }) {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div
          style={{
            height: "100%",
            marginTop: "200px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ textAlign: "center", fontSize: "60px" }}>Welcome</h1>
          {isConnected ? (
            <h2 style={{ textAlign: "center", fontSize: "30px" }}>
              You are connected to MongoDB
            </h2>
          ) : (
            <h2 style={{ textAlign: "center", fontSize: "30px" }}>
              You are NOT connected to MongoDB. Check the <code>README.md</code>{" "}
              for instructions.
            </h2>
          )}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    await clientPromise;

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
