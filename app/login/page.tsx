"use client";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { loginWithEmail, loginWithGoogle } from "@/lib/auth";
import { createUser, updateUserLoginDetails, userExists } from "@/lib/storage";
import { useAuth } from "@/context/AuthUserContext";
import { PageTitle } from "@/components/pageTitle";
import { useRouter } from "next/navigation";
import { Panel } from "@/components/panel";
import toast from "react-hot-toast";
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";

export default function LoginPage() {
  const [loggingIn, setLoggingIn] = useState(false);
  const { authUser, authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const router = useRouter();

  if (authUser) {
    router.push("/settings");
  }

  const loginWithEmailPressed = async () => {
    console.log("loginWithEmailPressed: " + email);
    setLoggingIn(true);

    loginWithEmail(email, window.location.origin);

    setLoggingIn(false);
  };

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
      <Panel>
        <PageTitle>Login</PageTitle>
        {authLoading ? (
          <div className="mt-8">
            <Spinner />
          </div>
        ) : (
          <>
            {authUser ? (
              <div className="mt-8">
                <div>Your email: {authUser.email}</div>
                <div>Your alerts: 0</div>
              </div>
            ) : (
              <>
                <Input
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <Button
                  className="m-4"
                  color="primary"
                  variant="flat"
                  onPress={loginWithEmailPressed}
                >
                  Login with Email
                </Button>

                <Divider></Divider>
                <div className="m-4">
                  <Button
                    color="primary"
                    variant="flat"
                    onPress={loginWithGooglePressed}
                  >
                    Login with Google
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </Panel>
    </div>
  );
}
