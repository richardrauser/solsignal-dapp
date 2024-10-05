import {
  AccountChangeCallback,
  AccountSubscriptionConfig,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";

// prod quicknode
const SOLANA_HTTP_ENDPOINT =
  "https://white-blue-thunder.solana-mainnet.quiknode.pro/013268b6574ed4ec03683c918cadca2ba92226e1";
const SOLANA_WSS_ENDPOINT =
  "wss://white-blue-thunder.solana-mainnet.quiknode.pro/013268b6574ed4ec03683c918cadca2ba92226e1";

function getSolanaConnection() {
  const solanaConnection = new Connection(SOLANA_HTTP_ENDPOINT, {
    wsEndpoint: SOLANA_WSS_ENDPOINT,
  });

  return solanaConnection;
}

export async function fetchWalletBalance(walletAddress: string) {
  const solanaConnection = getSolanaConnection();
  const walletPublicKey = new PublicKey(walletAddress);

  const walletInfo = await solanaConnection.getAccountInfo(walletPublicKey);

  const walletLamports = walletInfo?.lamports;

  if (walletLamports) {
    return walletLamports / LAMPORTS_PER_SOL;
  } else {
    return null;
  }
}

export async function fetchWalletTransactions(walletAddress: string) {
  const solanaConnection = getSolanaConnection();
  const walletPublicKey = new PublicKey(walletAddress);

  const sigList = await solanaConnection.getSignaturesForAddress(
    walletPublicKey,
    { limit: 5 },
  );

  console.log("sigList: ", sigList);

  // const sigs = sigList.map((sig) => sig.signature)

  return sigList;
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
}

export function createWalletSubscription(
  walletAddress: string,
  callback: AccountChangeCallback,
) {
  console.log("Creating wallet subscription for: " + walletAddress);

  return (async () => {
    const solanaConnection = getSolanaConnection();
    const walletPublicKey = new PublicKey(walletAddress);

    const config: AccountSubscriptionConfig = {
      commitment: "confirmed",
    };

    const subscriptionId = solanaConnection.onAccountChange(
      walletPublicKey,
      callback,
      config,
    );

    console.log("Starting web socket, subscription ID: ", subscriptionId);
  })();
}
