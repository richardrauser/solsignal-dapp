"use client";
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
import {
  PiCarProfile,
  PiPerson,
  PiPersonSimple,
  PiWarningCircle,
} from "react-icons/pi";
import { Panel } from "@/components/panel";
import { withAuth } from "@/components/withAuth";

function SettingsPage() {
  const { authUser, authLoading } = useAuth();

  const loginWithGooglePressed = async () => {
    console.log("loginWithGooglePressed");
    const user = await loginWithGoogle();
    const existingUser = await userExists(user.uid);
    if (!existingUser) {
      await createUser(user);
    } else {
      updateUserLoginDetails(user.uid);
    }
  };

  return (
    <div>
      <PageTitle>Settings</PageTitle>

      <Panel>
        {authLoading ? (
          <div className="mt-8">
            <Spinner />
          </div>
        ) : (
          <>
            {authUser ? (
              <div className="mt-8">
                <div className="p-4 flex">
                  <PiPerson className="m-2" />
                  <b>Your email:</b> {authUser.email}
                </div>
                <div className="p-4 flex">
                  <PiWarningCircle className="m-2" />
                  <b>Your alerts: </b> 0
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

export default withAuth(SettingsPage);
