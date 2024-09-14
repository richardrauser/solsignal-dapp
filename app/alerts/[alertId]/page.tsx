'use client'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PiWallet } from 'react-icons/pi'

const rows = [
  {
    key: '1',
    name: 'Tony Reichert',
    role: 'CEO',
    status: 'Active',
  },
  {
    key: '2',
    name: 'Zoey Lang',
    role: 'Technical Lead',
    status: 'Paused',
  },
  {
    key: '3',
    name: 'Jane Fisher',
    role: 'Senior Developer',
    status: 'Active',
  },
  {
    key: '4',
    name: 'William Howard',
    role: 'Community Manager',
    status: 'Vacation',
  },
]

const columns = [
  {
    key: 'name',
    label: 'TX SIGNATURE',
  },
  {
    key: 'name',
    label: 'BLOCKTIME',
  },
  // {
  //   key: 'status',
  //   label: 'STATUS',
  // },
]

export default function AlertPage({ params: { alertId } }) {
  console.log('AlertPage - Alert ID: ', alertId)

  const [balance, setBalance] = useState<string | null>(null)

  // prod quicknode
  const solanaConnection = new Connection(
    'https://white-blue-thunder.solana-mainnet.quiknode.pro/013268b6574ed4ec03683c918cadca2ba92226e1'
  )
  const walletKey = new PublicKey('GQSGWetfWEUCwaRFonvgLj16ZEjoBNnQwFEjNmSygRB2')

  useEffect(() => {
    const fetchData = async () => {
      const walletInfo = await solanaConnection.getAccountInfo(walletKey)

      const walletLamports = walletInfo?.lamports
      if (walletLamports) {
        setBalance(`${walletLamports / LAMPORTS_PER_SOL} SOL`)
      } else {
        setBalance(`?`)
      }

      const sigList = await solanaConnection.getSignaturesForAddress(walletKey, { limit: 10 })
      console.log('sigList count: ', sigList.length)

      const sigs = sigList.map((sig) => sig.signature)

      for (const sig of sigs) {
        console.log('sig: ', sig)
        const tx = await solanaConnection.getParsedTransaction(sig, {
          maxSupportedTransactionVersion: 0,
        })
        console.log('tx: ', tx)
      }

      // console.log('txList: ', txList)
    }

    fetchData()
  })

  return (
    <Card className="py-4 max-w-[400px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-md uppercase font-bold">💸 Transaction Alert</p>
        <p className="text-small text-default-500">
          Receive email when this wallet makes a transaction
        </p>
      </CardHeader>
      <Divider />
      <CardBody className="overflow-visible mt-2 mb-2">
        <PiWallet className="text-xl text-default-400" />
        <div>{walletKey.toString()}</div>
        <div>Balance: {balance}</div>
        <p className="text-md font-bold mt-4">Recent Transactions</p>
        <Table aria-label="Example table with dynamic content">
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.key}>
                {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link href={'https://solscan.io/account/' + walletKey.toString()}>See more on Solscan</Link>
      </CardFooter>
    </Card>
  )
}
