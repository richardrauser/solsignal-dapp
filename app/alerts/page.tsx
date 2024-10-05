"use client";
import { Button } from "@nextui-org/button";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import toast from "react-hot-toast";
import { Link } from "@nextui-org/link";
import { PiInfoThin, PiTrashSimpleThin } from "react-icons/pi";

import { shortenString } from "@/lib/stringUtils";
import { deleteAlert, loadAlerts } from "@/lib/storage";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/context/AuthUserContext";
import { PageTitle } from "@/components/pageTitle";
import { Panel } from "@/components/panel";
import { withAuth } from "@/components/withAuth";

function AlertsPage() {
  // const [user, setUser] = useState<User | null>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loadingAlerts, setLoadingAlerts] = useState(true);

  const { authUser, authLoading: loading } = useAuth();

  const loadAlertData = async () => {
    console.log("User: ", authUser?.uid);
    const uid = authUser?.uid;

    if (!uid) {
      return;
    }
    const userAlerts = await loadAlerts(uid);

    console.log(`User's alerts: `, userAlerts);
    setAlerts(userAlerts);
    setLoadingAlerts(false);
  };

  useEffect(() => {
    console.log("useEffect");
    loadAlertData();
  }, [authUser]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const currentUser = await getCurrentUser()

  //     console.log('Current user: ', currentUser)
  //     const uid = currentUser?.uid
  //     if (!uid) {
  //       return
  //     }
  //     const userAlerts = await loadAlerts(uid)
  //     console.log(`User's alerts: `, userAlerts)
  //     setAlerts(userAlerts)
  //   }

  //   getData()
  // }, [alerts])

  const columns = [
    // { id: "id", label: "ID" },
    {
      key: "type",
      label: "TYPE",
    },
    // {
    //   key: "email",
    //   label: "EMAIL",
    // },
    {
      key: "walletAddress",
      label: "ADDRESS",
    },
    {
      key: "createdAtString",
      label: "DATE CREATED",
    },
    {
      key: "action",
      label: "ACTION",
    },
  ];

  const deletePressed = async (alertId: string) => {
    console.log("Delete pressed for id: ", alertId);

    var newAlerts = alerts.map((alert) => {
      if (alert.id == alertId) {
        console.log("Setting deleting to true for alert: ", alert.id);

        return { ...alert, deleting: true };
      }

      return alert;
    });

    setAlerts(newAlerts);

    console.log("New alerts: ", newAlerts);

    const runDelete = async () => {
      const uid = authUser?.uid;

      if (!uid) {
        return;
      }

      var delayInMilliseconds = 0; //1 second

      setTimeout(async function () {
        await deleteAlert(alertId);

        // TODO: remove webhook from helius

        loadAlertData();
        toast.success("Alert deleted");
      }, delayInMilliseconds);
    };

    runDelete();
  };

  return (
    <div>
      <Panel>
        <PageTitle>Your alerts</PageTitle>
        {loadingAlerts ? (
          <Spinner />
        ) : (
          <>
            <p className={"mt-8 mb-4"}>
              You{`'`}ll receive an alert email when these events occur.
            </p>{" "}
            <Table aria-label="Example table with dynamic content">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>

              {alerts.length == 0 ? (
                <TableBody
                  emptyContent={
                    <>
                      <p>No alerts yet.</p>
                      <Link className="mt-4" href={siteConfig.navItems[0].href}>
                        <Button>create an alert</Button>
                      </Link>
                    </>
                  }
                >
                  {[]}
                </TableBody>
              ) : (
                <TableBody items={alerts}>
                  {(item) => (
                    <TableRow key={item.id}>
                      {(columnKey) => {
                        const value = getKeyValue(item, columnKey);

                        if (columnKey == "walletAddress") {
                          return (
                            <TableCell align="center">
                              {shortenString(value)}
                            </TableCell>
                          );
                        } else if (columnKey == "action") {
                          return (
                            <TableCell align="center">
                              {item.deleting ? (
                                <center>
                                  <Spinner />
                                </center>
                              ) : (
                                <div className="flex items-center">
                                  {/* <Link href={"/alerts/" + item.id}> */}
                                  <Button
                                    isIconOnly
                                    as={Link}
                                    className="m-1 py-2"
                                    href={"/alerts/" + item.id}
                                    size="sm"
                                  >
                                    <PiInfoThin size="sm" />
                                  </Button>
                                  {/* </Link> */}
                                  <Button
                                    isIconOnly
                                    className="m-1 py-2"
                                    size="sm"
                                    onPress={() => deletePressed(item.id)}
                                  >
                                    <PiTrashSimpleThin size="sm" />
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell align="center">
                              {getKeyValue(item, columnKey)}
                            </TableCell>
                          );
                        }
                      }}
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
            <Button
              as={Link}
              className="mt-4"
              color="primary"
              href={"/alerts/new"}
              variant="flat"
            >
              create new alert
            </Button>
          </>
        )}
      </Panel>
    </div>
  );
}

export default withAuth(AlertsPage);
