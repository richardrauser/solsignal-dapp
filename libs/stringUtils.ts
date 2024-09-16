import { PublicKey } from '@solana/web3.js'
import { PiFadersHorizontalDuotone } from 'react-icons/pi'

export function shortenString(fullString: string) {
  console.log('Shortening address: ' + fullString)
  var shortenedString = fullString
  if (shortenedString.length > 10) {
    shortenedString = shortenedString.substring(0, 4) + '...' + shortenedString.slice(-4)
  }
  return shortenedString
}

export function validateSolanaAddress(address: string) {
  try {
    const publicKey = new PublicKey(address)
    const isSolanaAddress = PublicKey.isOnCurve(publicKey)
    return isSolanaAddress
  } catch (error) {
    console.log('Error validating Solana address: ', error)
    return false
  }
}
