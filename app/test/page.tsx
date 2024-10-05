"use client";

import { Snippet } from "@nextui-org/snippet";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect } from "react";

import { PageTitle } from "@/components/pageTitle";
import { createWalletSubscription } from "@/lib/blockchain";

export default function TestPage() {
  console.log("TestPage");

  const walletAddress = "GQSGWetfWEUCwaRFonvgLj16ZEjoBNnQwFEjNmSygRB2";

  useEffect(() => {
    console.log("TestPage - useEffect");
    createWalletSubscription(walletAddress, (updatedAccountInfo) => {
      console.log(
        `---Event Notification for ${walletAddress.toString()}--- \nNew Account Balance:`,
        updatedAccountInfo.lamports / LAMPORTS_PER_SOL,
        " SOL",
      );
    });
  }, []);

  return (
    <div>
      <PageTitle>Test</PageTitle>
      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            {/* Get started by editing <Code color="primary">app/page.tsx</Code> */}
            Coming soon...
          </span>
        </Snippet>
      </div>
      <div className="mt-8">Testing...</div>
    </div>
  );
}
