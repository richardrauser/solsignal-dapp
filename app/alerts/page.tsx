'use client'
import { title } from '@/components/primitives'
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
import toast from 'react-hot-toast'
import { Link } from '@nextui-org/link'
import { shortenString } from '@/libs/stringUtils'
import { PiInfoFill, PiInfoThin, PiTrashSimpleThin } from 'react-icons/pi'

export default function AlertsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [alerts, setAlerts] = useState<any[]>([])
  const [loadingAlerts, setLoadingAlerts] = useState(true)

  const auth = getFirebaseAuth()
  onAuthStateChanged(auth, (newUser: User | null) => {
    // console.log("[onAuthStateChanged] User: ", user);
    if (newUser != user) {
      console.log('[onAuthStateChanged] Setting new user: ', newUser)
      setUser(newUser)
      // setLoading(false);
    }
  })

  const loadAlertData = async () => {
    // const currentUser = getCurrentUser();

    // console.log("Current user: ", currentUser);
    console.log('User: ', user?.uid)
    const uid = user?.uid
    if (!uid) {
      return
    }
    const userAlerts = await loadAlerts(uid)
    console.log(`User's alerts: `, userAlerts)
    setAlerts(userAlerts)
    setLoadingAlerts(false)
  }

  useEffect(() => {
    console.log('useEffect')
    loadAlertData()
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

  const columns = [
    // { id: "id", label: "ID" },
    {
      key: 'type',
      label: 'TYPE',
    },
    // {
    //   key: "email",
    //   label: "EMAIL",
    // },
    {
      key: 'walletAddress',
      label: 'ADDRESS',
    },
    {
      key: 'createdAtString',
      label: 'DATE CREATED',
    },
    {
      key: 'action',
      label: 'ACTION',
    },
  ]

  const deletePressed = async (alertId: string) => {
    console.log('Delete pressed for id: ', alertId)

    var newAlerts = alerts.map((alert) => {
      if (alert.id == alertId) {
        console.log('Setting deleting to true for alert: ', alert.id)
        return { ...alert, deleting: true }
      }
      return alert
    })
    setAlerts(newAlerts)

    console.log('New alerts: ', newAlerts)

    const runDelete = async () => {
      const uid = user?.uid
      if (!uid) {
        return
      }

      var delayInMilliseconds = 0 //1 second

      setTimeout(async function () {
        await deleteAlert(alertId)
        loadAlertData()
        toast.success('Alert deleted')
      }, delayInMilliseconds)
    }

    runDelete()
  }

  return (
    <div>
      <h1 className={title()}>Your alerts</h1>

      <div className="mt-8">
        {loadingAlerts ? (
          <Spinner />
        ) : (
          <>
            <p className={'mt-8 mb-4'}>
              You{`'`}ll receive an alert email when these events occur.
            </p>{' '}
            <Table aria-label="Example table with dynamic content">
              <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
              </TableHeader>

              {alerts.length == 0 ? (
                <TableBody emptyContent={'No alerts yet.'}>{[]}</TableBody>
              ) : (
                <TableBody items={alerts}>
                  {(item) => (
                    <TableRow key={item.id}>
                      {(columnKey) => {
                        const value = getKeyValue(item, columnKey)

                        if (columnKey == 'walletAddress') {
                          return <TableCell align="center">{shortenString(value)}</TableCell>
                        } else if (columnKey == 'action') {
                          return (
                            <TableCell align="center">
                              {item.deleting ? (
                                <center>
                                  <Spinner />
                                </center>
                              ) : (
                                <div className="flex items-center">
                                  <Link href={'/alerts/' + item.id}>
                                    <Button isIconOnly className="m-1 py-2" size="sm">
                                      <PiInfoThin size="sm" />
                                    </Button>
                                  </Link>
                                  <Button
                                    isIconOnly
                                    className="m-1 py-2"
                                    onPress={() => deletePressed(item.id)}
                                    size="sm"
                                  >
                                    <PiTrashSimpleThin size="sm" />
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          )
                        } else {
                          return (
                            <TableCell align="center">{getKeyValue(item, columnKey)}</TableCell>
                          )
                        }
                      }}
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </>
        )}
      </div>
    </div>
  )
}
