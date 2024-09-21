'use client'

import { title } from '@/components/primitives'
import { createWalletSubscription } from '@/libs/blockchain'
import { Snippet } from '@nextui-org/snippet'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useEffect } from 'react'

export default function TestPage() {
  console.log('TestPage')

  const walletAddress = 'GQSGWetfWEUCwaRFonvgLj16ZEjoBNnQwFEjNmSygRB2'

  useEffect(() => {
    console.log('TestPage - useEffect')
    createWalletSubscription(walletAddress, (updatedAccountInfo) => {
      console.log(
        `---Event Notification for ${walletAddress.toString()}--- \nNew Account Balance:`,
        updatedAccountInfo.lamports / LAMPORTS_PER_SOL,
        ' SOL'
      )
    })
  }, [])

  return (
    <div>
      <h1 className={title()}>Test</h1>
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
  )
}
