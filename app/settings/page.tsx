"use client";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { loginWithGoogle } from "@/lib/auth";
import { Chip } from "@nextui-org/chip";
import {
  createUser,
  loadUserAlertCount,
  updateUserLoginDetails,
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
      const alertCount = await loadUserAlertCount(authUser?.uid);
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
      await updateUserLoginDetails(user.uid);
    }
  };

  return (
    <div>
      <Panel>
        <PageTitle>Settings</PageTitle>
        {authLoading ? (
          <div className="mt-8">
            <Spinner />
          </div>
        ) : (
          <>
            {authUser ? (
              <div className="mt-8">
                <div className="p-4 flex align-middle">
                  <PiPerson className="m-1 mt-1.5" />
                  <div className="align-middle">
                    <b>Email:</b>{" "}
                    <Chip className="ml-2" color="primary">
                      {authUser.email}
                    </Chip>
                  </div>
                </div>
                <div className="p-4 flex">
                  <PiWarningCircle className="m-1 mt-1.5" />
                  <div className="align-middle">
                    <b>Alerts: </b>{" "}
                    {loadingAlertCount ? (
                      <Spinner className="ml-2" size="sm" />
                    ) : (
                      <Chip className="ml-2" color="primary">
                        {alertCount}
                      </Chip>
                    )}
                  </div>
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
