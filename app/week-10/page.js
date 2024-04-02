"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";


export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  console.log(user);

  return (
    <div>
      <p>{user ? "Hi there!" : "Please sign in"}</p>
      <p>{user?.email}</p>
      {user && user.displayName}
      <p>
        {user ? (
          <button onClick={firebaseSignOut}>Sign Out</button>
        ) : (
          <button onClick={gitHubSignIn}>Sign In with GitHub</button>
        )}
      </p>
      <Link href="/week-8/shopping-list">Shopping List</Link>

    </div>
  );
}