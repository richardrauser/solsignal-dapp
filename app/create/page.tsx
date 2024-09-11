'use client'
import { subtitle, title } from '@/components/primitives'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { use, useEffect, useState } from 'react'
import { PiWallet } from 'react-icons/pi'
import { getCurrentUser } from '@/libs/auth'

export default function CreatePage() {
  const [email, setEmail] = useState('')
  const [walletAddress, setWalletAddress] = useState('')

  const currentUser = getCurrentUser()

  useEffect(() => {
    console.log('currentUser: ', currentUser)
    setEmail(currentUser?.email ?? 'your.email@example.com')
  }, [currentUser])

  const createAlertPressed = async () => {
    console.log('createAlertPressed')
  }
  return (
    <div>
      <h2 className={subtitle()}>💸 Transaction Alert</h2>
      <div className="mt-8">
        <div>Notify {email} when this wallet makes a transaction:</div>
      </div>

      <Input
        className="mt-4"
        type="string"
        label="Solana wallet address"
        placeholder="0x..."
        startContent={
          <PiWallet className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
        }
      ></Input>

      <Button className="mt-4" color="primary" onPress={createAlertPressed} variant="flat">
        create alert
      </Button>

      <h2 className={subtitle()}>📈 Balance Alert</h2>
      <div className="mt-8">
        <div>Notify {email} when this wallet crosses a threshold:</div>
      </div>
    </div>
  )
}
