import { User } from 'firebase/auth'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getCountFromServer,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { getFirebase } from './firebase'

enum AlertType {
  transaction = 'transaction',
  balance = 'balance',
}

async function getStorage() {
  const firebase = getFirebase()
  return getFirestore(firebase)
}
export async function userExists(uid: string) {
  const firestore = await getStorage()
  const usersCollection = collection(firestore, 'users')

  const user = await getDoc(doc(usersCollection, uid))

  return user.exists()
}

export async function createUser(user: User) {
  console.log('storeUser: ', user)
  const firestore = await getStorage()

  const usersCollection = collection(firestore, 'users')

  setDoc(doc(usersCollection, user.uid), {
    uid: user.uid,
    email: user.email,
    createdAt: new Date(),
    lastLoginAt: new Date(),
    loginCount: 1,
  })
}

export async function updateUserLogin(uid: string) {
  console.log('updateUserLogin: ', uid)
  const firestore = await getStorage()

  const userDoc = doc(firestore, 'users', uid)
  const user = await getDoc(userDoc)

  if (!user.exists()) {
    throw new Error(`User with uid ${uid} does not exist`)
  }

  const data = user.data()

  console.log('User data: ', data)
  const loginCount = data.loginCount + 1

  console.log('Updating user login count to: ', loginCount)

  setDoc(userDoc, {
    ...data,
    loginCount,
    lastLoginAt: new Date(),
  })
}

export async function checkWallertAlertExists(uid: string, walletAddress: string, email: string) {
  const firestore = await getStorage()
  const alertType = AlertType.transaction
  const alertsCollection = collection(firestore, 'alerts')

  const alertsQuery = query(
    alertsCollection,
    where('uid', '==', uid),
    where('type', '==', alertType),
    where('walletAddress', '==', walletAddress),
    where('email', '==', email)
  )
  const countResult = await getCountFromServer(alertsQuery)
  return countResult.data().count > 0
}

export async function createWalletAlert(uid: string, walletAddress: string, email: string) {
  console.log('createWalletAlert: ', walletAddress, email)
  const firestore = await getStorage()
  const alertType = AlertType.transaction
  const alertsCollection = collection(firestore, 'alerts')

  const data = {
    uid,
    type: alertType,
    walletAddress,
    email,
    createdAt: new Date(),
  }
  console.log('Creating wallet alert: ', data)

  addDoc(alertsCollection, data)
}

export async function checkBalanceAlertExists(uid: string, walletAddress: string, email: string) {
  const firestore = await getStorage()
  const alertType = AlertType.balance
  const alertsCollection = collection(firestore, 'alerts')

  const alertsQuery = query(
    alertsCollection,
    where('uid', '==', uid),
    where('type', '==', alertType),
    where('walletAddress', '==', walletAddress),
    where('email', '==', email)
  )
  const countResult = await getCountFromServer(alertsQuery)
  return countResult.data().count > 0
}

export async function createBalanceAlert(uid: string, walletAddress: string, email: string) {
  console.log('createBalanceAlert: ', walletAddress, email)
  const firestore = await getStorage()
  const alertType = AlertType.balance
  const alertsCollection = collection(firestore, 'alerts')

  const data = {
    uid,
    type: alertType,
    walletAddress,
    email,
    createdAt: new Date(),
  }
  console.log('Creating balance alert: ', data)

  addDoc(alertsCollection, data)
}

export async function loadAlerts(uid: string) {
  console.log('loadAlerts')
  const firestore = await getStorage()
  const alertsCollection = collection(firestore, 'alerts')

  const alertsQuery = query(alertsCollection, where('uid', '==', uid))
  const querySnapshot = await getDocs(alertsQuery)

  var alerts = querySnapshot.docs.map((doc: any) => {
    console.log('createdAt: ' + doc.data().createdAt)
    const createdAtDate = new Date(doc.data().createdAt.seconds * 1000)
    const createdAtString = createdAtDate.toLocaleDateString()
    console.log('createdAtString: ' + createdAtString)
    return {
      id: doc.id,
      createdAtString,
      ...doc.data(),
    }
  })

  console.log('Loaded alerts: ', alerts)

  return alerts
}

export async function loadAlert(id: string) {
  console.log('loadAlert')
  const firestore = await getStorage()
  const alertsCollection = collection(firestore, 'alerts')

  const alertDoc = await getDoc(doc(alertsCollection, id))
  console.log('Loaded alert: ', alertDoc.data())

  return alertDoc.data()
}

export async function deleteAlert(alertId: string) {
  console.log('deleteAlert: ', alertId)
  const firestore = await getStorage()
  const alertsCollection = collection(firestore, 'alerts')

  await deleteDoc(doc(alertsCollection, alertId))

  // TODO: remove webhook from helius
  
  console.log('Deleted alert: ', alertId)
}
