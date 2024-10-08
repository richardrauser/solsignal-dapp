"use client";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { Chip } from "@nextui-org/chip";
import { PiCreditCard, PiPerson, PiWarningCircle } from "react-icons/pi";

import { loginWithGoogle } from "@/lib/auth";
import {
  createUser,
  loadPricePlan,
  loadUserAlertCount,
  PricePlan,
  updateUserLoginDetails,
  userExists,
} from "@/lib/storage";
import { useAuth } from "@/context/AuthUserContext";
import { PageTitle } from "@/components/pageTitle";
import { Panel } from "@/components/panel";
import { withAuth } from "@/components/withAuth";

function SettingsPage() {
  const { authUser, authLoading } = useAuth();
  const [loadingAlertCount, setLoadingAlertCount] = useState(true);
  const [pricePlan, setPricePlan] = useState<PricePlan | null>(null);
  const [alertCount, setAlertCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!authUser) {
        return;
      }
      const alertCount = await loadUserAlertCount(authUser?.uid);
      const plan = await loadPricePlan("free");

      setPricePlan(plan);
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
              <div className="grid grid-cols-2 mt-8 px-4">
                <div className="flex align-middle my-2">
                  <PiPerson className="m-1 mt-1.5" />
                  <div className="align-middle">
                    <b>Email:</b>{" "}
                  </div>
                </div>
                <Chip className="my-2" color="primary">
                  {authUser.email}
                </Chip>
                <div className="flex align-middle my-2">
                  <PiCreditCard className="m-1 mt-1.5" />
                  <div className="align-middle">
                    <b>Plan:</b>{" "}
                  </div>
                </div>
                {loadingAlertCount ? (
                  <Spinner className="my-2" size="sm" />
                ) : (
                  <Chip className="p-2 my-2 center" color="primary">
                    {pricePlan?.name}
                  </Chip>
                )}
                <div className="flex my-2">
                  <PiWarningCircle className="m-1 mt-1.5" />
                  <div className="align-middle">
                    <b>Alerts: </b>{" "}
                  </div>
                </div>
                {loadingAlertCount ? (
                  <Spinner className="my-2" size="sm" />
                ) : (
                  <Chip className="my-2 align-right" color="primary">
                    {alertCount} / {pricePlan?.alerts}
                  </Chip>
                )}
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
