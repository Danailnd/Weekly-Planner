import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR("/api/user");

  useEffect(() => {
    // Ensure that redirect only happens when the user data is available
    if (!user) return; // Wait until user data is fetched

    // Determine whether to redirect based on user authentication status
    const isLoggedIn = user?.isLoggedIn;

    if (redirectTo) {
      if (!redirectIfFound && !isLoggedIn) {
        // If user is not logged in and redirectTo is set, redirect to login
        Router.push(redirectTo);
      } else if (redirectIfFound && isLoggedIn) {
        // If user is logged in and redirectIfFound is set, redirect to the target
        Router.push(redirectTo);
      }
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
