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
import { useRouter } from "next/navigation";
import { Panel } from "@/components/panel";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [loggingIn, setLoggingIn] = useState(false);
  const { authUser, authLoading } = useAuth();
  const router = useRouter();

  if (authUser) {
    router.push("/settings");
  }

  const loginWithGooglePressed = async () => {
    console.log("loginWithGooglePressed");
    setLoggingIn(true);
    try {
      const user = await loginWithGoogle();
      const existingUser = await userExists(user.uid);
      if (!existingUser) {
        await createUser(user);
      } else {
        updateUserLoginDetails(user.uid);
      }
    } catch (error: any) {
      console.log("Login error: " + error.message);
      toast.error("Could not login. " + error.message);
    }
    setLoggingIn(false);
  };

  return (
    <div>
      <PageTitle>Login</PageTitle>
      <Panel>
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
      </Panel>
    </div>
  );
}
