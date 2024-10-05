"use client";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { loginWithGoogle } from "@/lib/auth";
import {
  createUser,
  loadAlertCount,
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
  const [loadingAlertCount, setLoadingAlertCount] = useState(true);
  const [alertCount, setAlertCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!authUser) {
        return;
      }
      const alertCount = await loadAlertCount(authUser?.uid);
      setAlertCount(alertCount);
      setLoadingAlertCount(false);
    };
    fetchData();
  }, [authUser]);

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
                  <b>Your alerts: </b>{" "}
                  {loadingAlertCount ? <Spinner className="sm" /> : alertCount}
                </div>
              </div>
            ) : (
              <div className="mt-8">No user logged in.</div>
            )}
          </>
        )}
      </Panel>
    </div>
  );
}

export default withAuth(SettingsPage);
