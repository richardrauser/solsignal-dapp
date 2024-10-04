"use client";

import { LOCAL_STORE_EMAIL_FOR_AUTH_KEY } from "@/lib/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Spinner } from "@nextui-org/spinner";
import { Panel } from "@/components/panel";
import { PageTitle } from "@/components/pageTitle";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/button";

export default function AuthLinkPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  console.log("AuthLinkPage - signing in with email...");
  const auth = getFirebaseAuth();
  // Confirm the link is a sign-in with email link.

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem(LOCAL_STORE_EMAIL_FOR_AUTH_KEY);
      if (!email) {
        console.log("AuthLinkPage - No email found in local storage.");
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }

      console.log("AuthLinkPage - Email: " + email);

      if (!email) {
        console.log("AuthLinkPage - No email entered.");
        toast.error("No email found. Please try again.");
      } else {
        console.log("AuthLinkPage - Email found. Completing sign in...");
        // The client SDK will parse the code from the link for you.
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            console.log("AuthLinkPage - Sign in successful. Redirecting...");
            // Clear email from storage.
            window.localStorage.removeItem(LOCAL_STORE_EMAIL_FOR_AUTH_KEY);
            // You can access the new user by importing getAdditionalUserInfo
            // and calling it with result:
            // getAdditionalUserInfo(result)
            // You can access the user's profile via:
            // getAdditionalUserInfo(result)?.profile
            // You can check if the user is new or existing:
            // getAdditionalUserInfo(result)?.isNewUser

            router.push("/settings");
          })
          .catch((error) => {
            console.log("AuthLinkPage - Sign in error: " + error.message);
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
            setErrorMessage(error.message);
          });
      }
    } else {
      setErrorMessage("Invalid sign-in link.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <>
        <PageTitle>Authenticating...</PageTitle>
        <Panel>
          <Spinner />
        </Panel>
      </>
    );
  } else {
    return (
      <>
        <PageTitle>Authentication failed.</PageTitle>
        <Panel>
          An error occurred. {errorMessage}
          <Link className="block" href="/login">
            <Button className="mt-4" color="primary" variant="flat">
              Return to Login
            </Button>
          </Link>
        </Panel>
      </>
    );
  }
}
