'use client'
import { Button } from '@nextui-org/button'
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
import Link from 'next/link'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { PiWallet } from 'react-icons/pi'
import { shortenString } from '@/libs/stringUtils'
import { link as linkStyles } from '@nextui-org/theme'
import NextLink from 'next/link'

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
    key: 'signature',
    label: 'TX SIGNATURE',
  },
  {
    key: 'blockTime',
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
  const [transactions, setTransactions] = useState<any[]>([])

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
      console.log('sigList: ', sigList)

      const sigs = sigList.map((sig) => sig.signature)

      // var transactions = []

      // for (const sig of sigs) {
      //   console.log('sig: ', sig)
      //   const tx = await solanaConnection.getParsedTransaction(sig, {
      //     maxSupportedTransactionVersion: 0,
      //   })
      //   console.log('tx: ', tx)
      //   transactions.push(tx)
      // }

      // console.log('transactions: ', transactions)
      setTransactions(sigList)
    }

    fetchData()
  }, [])

  return (
    <Card className="py-4 max-w-[400px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-md uppercase font-bold">💸 Transaction Alert</p>
        <p className="text-small text-default-500 mb-2">
          Receive email when this wallet makes a transaction
        </p>
      </CardHeader>
      <Divider />
      <CardBody className="overflow-visible mt-2 mb-2">
        <p className="text-md font-bold mb-2">Wallet Details</p>
        <div className="flex items-center">
          <PiWallet className="inline-block align-middle text-xl text-default-400 mr-1" />

          <NextLink
            className={clsx(
              linkStyles({ color: 'foreground' }),
              'data-[active=true]:text-primary data-[active=true]:font-medium'
            )}
            color="foreground"
            href={'https://solscan.io/account/' + walletKey.toString()}
          >
            {shortenString(walletKey.toString())}
          </NextLink>
        </div>
        <div>Balance: {balance}</div>
        <p className="text-md font-bold mt-4">Recent Transactions</p>
        <Table aria-label="Recent transactions">
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {transactions.map((row) => (
              <TableRow key={row.key}>
                {(columnKey) => {
                  const value = getKeyValue(row, columnKey)
                  if (columnKey === 'signature') {
                    return (
                      <TableCell>
                        <NextLink
                          className={clsx(
                            linkStyles({ color: 'foreground' }),
                            'data-[active=true]:text-primary data-[active=true]:font-medium'
                          )}
                          color="foreground"
                          href={'https://solscan.io/tx/' + value}
                        >
                          {shortenString(value)}
                        </NextLink>
                      </TableCell>
                    )
                  } else {
                    return <TableCell>{getKeyValue(row, columnKey)}</TableCell>
                  }
                }}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </CardFooter>
    </Card>
  )
}
