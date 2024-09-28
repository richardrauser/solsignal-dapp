"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Link } from "@nextui-org/link";
import { useEffect, useState } from "react";
import {
  PiArrowElbowDownRightThin,
  PiMoneyWavyThin,
  PiNotePencilThin,
  PiTrashSimpleThin,
  PiWallet,
} from "react-icons/pi";
import { shortenString } from "@/lib/stringUtils";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import { deleteAlert, loadAlert } from "@/lib/storage";
import { Spinner } from "@nextui-org/spinner";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { fetchWalletBalance, fetchWalletTransactions } from "@/lib/blockchain";

const columns = [
  {
    key: "signature",
    label: "TX SIGNATURE",
  },
  {
    key: "blockTime",
    label: "BLOCKTIME",
  },
  // {
  //   key: 'status',
  //   label: 'STATUS',
  // },
];

export default function AlertPage({
  params: { alertId },
}: {
  params: { alertId: string };
}) {
  console.log("AlertPage - Alert ID: ", alertId);
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [walletDetailsLoading, setWalletDetailsLoading] = useState(true);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const transactionAlert = await loadAlert(alertId);
      if (!transactionAlert) {
        return;
      }
      const address = transactionAlert.walletAddress;
      setWalletAddress(address);

      const walletBalance = await fetchWalletBalance(address);
      if (walletBalance) {
        setBalance(`${walletBalance} SOL`);
      } else {
        setBalance(`?`);
      }

      setWalletDetailsLoading(false);

      const sigList = await fetchWalletTransactions(address);

      setTransactions(sigList);
      setTransactionsLoading(false);
    };

    fetchData();
  }, []);

  const editPressed = () => {
    console.log("Edit pressed for id: ", alertId);
    // TODO: edit alert
    toast.success("Edit functionality coming soon...");
  };

  const deletePressed = async () => {
    console.log("Delete pressed for id: ", alertId);

    await deleteAlert(alertId);

    // TODO: remove webhook from helius

    toast.success("Alert deleted");
    router.push("/alerts");
  };

  return (
    <Card className="py-4 max-w-[400px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-md uppercase font-bold">💸 Transaction Alert</p>
        <p className="flex items-center text-small text-default-500 mt-2 mb-4">
          <PiArrowElbowDownRightThin className="inline-block align-middle text-xl text-default-400 mr-2" />
          Receive email when this wallet makes a transaction
        </p>
      </CardHeader>
      <Divider />
      <CardBody className="overflow-visible mt-2 mb-2">
        <p className="text-md font-bold mb-2">Wallet Details</p>
        {walletDetailsLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="flex items-center">
              <PiWallet className="inline-block align-middle text-xl text-default-400 mr-2" />

              <Link
                isExternal
                color="foreground"
                href={"https://solscan.io/account/" + walletAddress}
              >
                {walletAddress && shortenString(walletAddress)}
              </Link>
            </div>
            <div className="flex items-center mt-2">
              <PiMoneyWavyThin className="inline-block align-middle text-xl text-default-400 mr-2" />
              {balance}
            </div>
          </>
        )}
        <p className="text-md font-bold mt-4">Recent Transactions</p>

        {transactionsLoading ? (
          <Spinner className="mt-2" />
        ) : (
          <Table className="mt-2" aria-label="Recent transactions">
            <TableHeader>
              {columns.map((column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {transactions.map((row) => (
                <TableRow key={row.key}>
                  {(columnKey) => {
                    const value = getKeyValue(row, columnKey);
                    if (columnKey === "signature") {
                      return (
                        <TableCell>
                          <Link
                            isExternal
                            color="foreground"
                            href={"https://solscan.io/tx/" + value}
                          >
                            {shortenString(value)}
                          </Link>
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell>{getKeyValue(row, columnKey)}</TableCell>
                      );
                    }
                  }}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardBody>
      <Divider />
      <CardFooter className="grid grid-cols-2">
        <Button onPress={editPressed} className="m-2">
          <PiNotePencilThin />
          Edit
        </Button>
        <Button onPress={deletePressed} className="m-2">
          <PiTrashSimpleThin />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
