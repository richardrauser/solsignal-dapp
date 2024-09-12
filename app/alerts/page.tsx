'use client'
import { title } from '@/components/primitives'
import { getCurrentUser } from '@/libs/auth'
import { getFirebaseAuth } from '@/libs/firebase'
import { loadAlerts } from '@/libs/storage'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from '@nextui-org/table'
import { onAuthStateChanged, User } from 'firebase/auth'
import { get } from 'http'
import { use, useEffect, useState } from 'react'

export default function AlertsPage() {
  const [user, setUser] = useState<any>(null)
  const [alerts, setAlerts] = useState<any[]>([])

  const auth = getFirebaseAuth()
  onAuthStateChanged(auth, (user: User | null) => {
    console.log('[onAuthStateChanged] User: ', user)
    setUser(user)
    // setLoading(false)
  })

  useEffect(() => {
    const getData = async () => {
      const currentUser = await getCurrentUser()

      console.log('Current user: ', currentUser)
      const uid = currentUser?.uid
      if (!uid) {
        return
      }
      const userAlerts = await loadAlerts(uid)
      console.log(`User's alerts: `, userAlerts)
      setAlerts(userAlerts)
    }

    getData()
  }, [user])

  const rows = [
    {
      key: '1',
      email: 'Tony.Reichert@gmail.com',
      walletAddress: '0z§1',
      type: 'wallet',
    },
    {
      key: '2',
      email: 'Zoey.Lang@gmail.com',
      walletAddress: '0xz9887',
      type: 'wallet',
    },
  ]

  const columns = [
    {
      key: 'type',
      label: 'TYPE',
    },
    {
      key: 'email',
      label: 'EMAIL',
    },
    {
      key: 'walletAddress',
      label: 'WALLET ADDRESS',
    },
  ]

  return (
    <div>
      <h1 className={title()}>Your alerts</h1>

      <div className="mt-8">
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={alerts}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
