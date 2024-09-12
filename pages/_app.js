import "../styles/globalStyles.css";
import React, { useState, useEffect } from "react";
import { SWRConfig } from "swr";
import fetchJson from "../lib/fetchJson";
import NavigationBar from "../src/Components/navBar.js";
import { CookiesProvider, useCookies } from "react-cookie";

export default function MyApp({ Component, pageProps }) {
  const [cookies, setCookie] = useCookies(["theme"]);

  useEffect(() => {
    const theme = cookies?.theme ? cookies?.theme : "pastel";
    document.body.setAttribute("data-theme", theme);
  }, [cookies]);

  return (
    <div>
      <CookiesProvider>
        <SWRConfig
          value={{
            fetcher: fetchJson,
            onError: (err) => {
              console.error(err);
            },
          }}
        >
          <NavigationBar />
          <Component {...pageProps} />{" "}
        </SWRConfig>
      </CookiesProvider>
    </div>
  );
}
