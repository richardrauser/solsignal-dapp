"use client";
import { subtitle, title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";
import { PiWallet } from "react-icons/pi";
import { getCurrentUser } from "@/lib/auth";
import {
  checkBalanceAlertExists,
  checkWallertAlertExists as checkTransactionAlertExists,
  createBalanceAlert,
  createWalletAlert as createTransactionAlert,
} from "@/lib/storage";
import toast from "react-hot-toast";
import { PublicKey } from "@solana/web3.js";
import { validateSolanaAddress } from "@/lib/stringUtils";

export default function NewAlertPage() {
  const [email, setEmail] = useState("");
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

    if (!currentUser) {
      const errorMessage = "No user logged in";
      console.error(errorMessage);

      throw Error(errorMessage);
    }

    const isAddressValid = validateSolanaAddress(transactionAlertWalletAddress);
    if (!isAddressValid) {
      toast.error("Invalid Solana wallet address.");
      return;
    }

    const alertExists = await checkTransactionAlertExists(
      currentUser.uid,
      transactionAlertWalletAddress,
      email
    );
    if (alertExists) {
      toast.error(
        `An alert with those parameters already exists. You can see it in "Your alerts"`
      );
      return;
    }

    await createTransactionAlert(
      currentUser.uid,
      transactionAlertWalletAddress,
      email
    );
    toast.success("Transaction alert created!");
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
      return;
    }

    const alertExists = await checkBalanceAlertExists(
      currentUser.uid,
      balanceAlertWalletAddress,
      email
    );
    if (alertExists) {
      toast.error(
        `An alert with those parameters already exists. You can see it in "Your alerts"`
      );
      return;
    }

    await createBalanceAlert(currentUser.uid, balanceAlertWalletAddress, email);
    toast.success("Balance alert created!");
  };

  return (
    <div>
      <h2 className={subtitle()}>💸 Transaction Alert</h2>
      <div className="mt-8">
        <div>Receive email when this wallet makes a transaction:</div>
      </div>

      <Input
        className="mt-4"
        type="string"
        label="Solana wallet address"
        value={transactionAlertWalletAddress}
        onChange={(e) => setTransactionAlertWalletAddress(e.target.value)}
        placeholder="0x..."
        startContent={
          <PiWallet className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
        }
      ></Input>

      <Button
        className="mt-4"
        color="primary"
        onPress={createTransactionAlertPressed}
        variant="flat"
      >
        create transaction alert
      </Button>

      <h2 className={subtitle({ class: "mt-12" })}>📈 Balance Alert</h2>
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
      </Button>
    </div>
  );
}
