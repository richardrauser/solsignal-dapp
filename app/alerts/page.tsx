'use client'
import { title } from '@/components/primitives'
import { getCurrentUser } from '@/libs/auth'
import { getFirebaseAuth } from '@/libs/firebase'
import { deleteAlert, loadAlerts } from '@/libs/storage'
import { Button } from '@nextui-org/button'
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
import { useEffect, useState } from 'react'
import { Spinner } from '@nextui-org/spinner'

export default function AlertsPage() {
  const [user, setUser] = useState<any>(null)
  const [alerts, setAlerts] = useState<any[]>([])
  const [loadingAlerts, setLoadingAlerts] = useState(false)

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
      setLoadingAlerts(false)
    }

    getData()
  }, [user])

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
    {
      key: 'action',
      label: 'ACTION',
    },
  ]

  const deletePressed = async (alertId: string) => {
    console.log('Delete pressed for id: ', alertId)
    setLoadingAlerts(true)
    await deleteAlert(alertId)

    const currentUser = await getCurrentUser()
    console.log('Current user: ', currentUser)
    const uid = currentUser?.uid
    if (!uid) {
      return
    }
    const userAlerts = await loadAlerts(uid)
    setAlerts(userAlerts)
    setLoadingAlerts(false)
  }

  return (
    <div>
      <h1 className={title()}>Your alerts</h1>

      <div className="mt-8">
        {loadingAlerts ? (
          <Spinner></Spinner>
        ) : (
          <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>

            <TableBody items={alerts}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>
                      {columnKey != 'action' ? (
                        getKeyValue(item, columnKey)
                      ) : (
                        <Button onPress={() => deletePressed(item.id)}>Delete</Button>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
