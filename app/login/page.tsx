'use client'
import { title } from '@/components/primitives'
import { Button } from '@nextui-org/button'
import { useState } from 'react'
import { Spinner } from '@nextui-org/spinner'
import { onAuthStateChanged, User } from 'firebase/auth'
import { loginWithGoogle } from '@/libs/auth'
import { getFirebaseAuth } from '@/libs/firebase'
import { createUser, updateUserLogin as updateUserLoginDetails, userExists } from '@/libs/storage'

export default function LoginPage() {
  const [loading, setLoading] = useState(true)
  const [loggingIn, setLoggingIn] = useState(false)
  const [user, setUser] = useState<User | null | undefined>(null)

  const auth = getFirebaseAuth()

  onAuthStateChanged(auth, (user: User | null) => {
    console.log('[onAuthStateChanged] User: ', user)
    if (!loggingIn) {
      setUser(user)
      setLoading(false)
    }
  })

  const loginWithGooglePressed = async () => {
    console.log('loginWithGooglePressed')
    setLoading(true)
    setLoggingIn(true)
    const user = await loginWithGoogle()
    const existingUser = await userExists(user.uid)
    if (!existingUser) {
      await createUser(user)
    } else {
      updateUserLoginDetails(user.uid)
    }
    setLoggingIn(false)
  }

  return (
    <div>
      <h1 className={title()}>Login</h1>
      {loading ? (
        <div className="mt-8">
          <Spinner />
        </div>
      ) : (
        <>
          {user ? (
            <div className="mt-8">
              <div>
                <b>Your email:</b> {user.email}
              </div>
              <div>
                <b>Your alerts:</b> 0
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <Button color="primary" variant="flat" onPress={loginWithGooglePressed}>
                Login with Google
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
