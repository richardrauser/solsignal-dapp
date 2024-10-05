"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";
import { PiWallet } from "react-icons/pi";
import { Spinner } from "@nextui-org/spinner";
import toast from "react-hot-toast";

import { getCurrentUser } from "@/lib/auth";
import {
  checkBalanceAlertExists,
  checkWallertAlertExists as checkTransactionAlertExists,
  createBalanceAlert,
  createWalletAlert as createTransactionAlert,
  loadSystemAlertCount,
  loadUserAlertCount,
} from "@/lib/storage";
import { validateSolanaAddress } from "@/lib/stringUtils";
import { PageTitle } from "@/components/pageTitle";
import { Panel } from "@/components/panel";
import { MAX_ALERT_COUNT_SYSTEM, MAX_ALERT_COUNT_USER } from "@/lib/consts";

export default function NewAlertPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionAlertWalletAddress, setTransactionAlertWalletAddress] =
    useState("");
  const [balanceAlertWalletAddress, setBalanceAlertWalletAddress] =
    useState("");

  const currentUser = getCurrentUser();

  useEffect(() => {
    console.log("currentUser: ", currentUser);
    setEmail(currentUser?.email ?? "your.email@example.com");
  }, [currentUser]);

  const createTransactionAlertPressed = async () => {
    console.log("createTransactionAlertPressed");
    setLoading(true);

    if (!currentUser) {
      const errorMessage = "No user logged in";

      toast.error(
        "Thanks for showing interest! Please login before creating your alert.",
      );
      // console.error(errorMessage);
      // throw Error(errorMessage);
      setLoading(false);

      return;
    }

    const isAddressValid = validateSolanaAddress(transactionAlertWalletAddress);

    if (!isAddressValid) {
      toast.error("Invalid Solana wallet address.");
      setLoading(false);

      return;
    }

    const alertExists = await checkTransactionAlertExists(
      currentUser.uid,
      transactionAlertWalletAddress,
      email,
    );

    if (alertExists) {
      toast.error(
        `An alert with those parameters already exists. You can see it in "Your alerts"`,
      );
      setLoading(false);

      return;
    }

    const currentAlertCount = await loadUserAlertCount(currentUser.uid);

    if (currentAlertCount >= MAX_ALERT_COUNT_USER) {
      toast.error(
        `You have reached the maximum number of ${MAX_ALERT_COUNT_USER} free alerts.`,
      );
      setLoading(false);

      return;
    }

    const systemAlertCount = await loadSystemAlertCount();

    if (currentAlertCount >= MAX_ALERT_COUNT_SYSTEM) {
      toast.error(
        `Sorry, SolSignal has reached the max number of system-wide alerts during its testing phase. Please try again another time.`,
      );
      setLoading(false);

      return;
    }

    try {
      await createTransactionAlert(
        currentUser.uid,
        transactionAlertWalletAddress,
        email,
      );
      toast.success("Transaction alert created!");
    } catch (error) {
      console.error("Error creating transaction alert: ", error);
      toast.error("Error creating transaction alert.");
    } finally {
      setLoading(false);
    }
  };

  const createBalanceAlertPressed = async () => {
    console.log("createBalancePressed");

    if (!currentUser) {
      const errorMessage = "No user logged in";

      console.error(errorMessage);

      throw Error(errorMessage);
    }

    const isAddressValid = validateSolanaAddress(balanceAlertWalletAddress);

    if (!isAddressValid) {
      toast.error("Invalid Solana wallet address.");
      setLoading(false);

      return;
    }

    const alertExists = await checkBalanceAlertExists(
      currentUser.uid,
      balanceAlertWalletAddress,
      email,
    );

    if (alertExists) {
      toast.error(
        `An alert with those parameters already exists. You can see it in "Your alerts"`,
      );
      setLoading(false);

      return;
    }

    await createBalanceAlert(currentUser.uid, balanceAlertWalletAddress, email);
    toast.success("Balance alert created!");
    setLoading(false);
  };

  return (
    <div>
      <Panel>
        <PageTitle>New Alert</PageTitle>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="mt-8">
              <div>
                <b>💸 Transaction Alert -</b> Receive an email when this wallet
                makes a transaction:
              </div>
            </div>

            <Input
              className="mt-4"
              label="Solana wallet address"
              placeholder="0x..."
              startContent={
                <PiWallet className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              type="string"
              value={transactionAlertWalletAddress}
              onChange={(e) => setTransactionAlertWalletAddress(e.target.value)}
            />

            <Button
              className="mt-4"
              color="primary"
              variant="flat"
              onPress={createTransactionAlertPressed}
            >
              create transaction alert
            </Button>

            <p className="mt-4">More alert types coming soon...</p>

            {/* <h2 className={subtitle({ class: "mt-12" })}>📈 Balance Alert</h2>
      <div className="mt-4">
        <div>Receive email when this wallet crosses a threshold:</div>
      </div>
      <Input
        className="mt-4"
        type="string"
        label="Solana wallet address"
        value={balanceAlertWalletAddress}
        onChange={(e) => setBalanceAlertWalletAddress(e.target.value)}
        placeholder="0x..."
        startContent={
          <PiWallet className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
        }
      ></Input>

      <Button
        className="mt-4"
        color="primary"
        onPress={createBalanceAlertPressed}
        variant="flat"
      >
        create balance alert
      </Button> */}
          </>
        )}
      </Panel>
    </div>
  );
}
