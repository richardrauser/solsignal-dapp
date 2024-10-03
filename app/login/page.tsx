"use client";
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { loginWithGoogle } from "@/lib/auth";
import {
  createUser,
  updateUserLogin as updateUserLoginDetails,
  userExists,
} from "@/lib/storage";
import { useAuth } from "@/context/AuthUserContext";
import { PageTitle } from "@/components/pageTitle";

export default function LoginPage() {
  const [loggingIn, setLoggingIn] = useState(false);
  const { authUser, authLoading } = useAuth();

  const loginWithGooglePressed = async () => {
    console.log("loginWithGooglePressed");
    setLoggingIn(true);
    const user = await loginWithGoogle();
    const existingUser = await userExists(user.uid);
    if (!existingUser) {
      await createUser(user);
    } else {
      updateUserLoginDetails(user.uid);
    }
    setLoggingIn(false);
  };

  return (
    <div>
      <PageTitle>Login</PageTitle>
      <div className="panel mt-8">
        {authLoading ? (
          <div className="mt-8">
            <Spinner />
          </div>
        ) : (
          <>
            {authUser ? (
              <div className="mt-8">
                <div>
                  <b>Your email:</b> {authUser.email}
                </div>
                <div>
                  <b>Your alerts:</b> 0
                </div>
              </div>
            ) : (
              <div className="mt-8">
                <Button
                  color="primary"
                  variant="flat"
                  onPress={loginWithGooglePressed}
                >
                  Login with Google
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
