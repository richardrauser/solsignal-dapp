import {
  AccountChangeCallback,
  AccountSubscriptionConfig,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";

// prod quicknode
function getSolanaConnection() {
  const solanaEndpoint = process.env.SOLANA_HTTP_ENDPOINT;
  if (!solanaEndpoint) {
    const errorMessage = "Solana endpoint not set.";
    throw new Error(errorMessage);
  }
  const solanaConnection = new Connection(solanaEndpoint, {
    wsEndpoint: process.env.SOLANA_WSS_ENDPOINT,
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
    { limit: 5 }
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
  callback: AccountChangeCallback
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
      config
    );

    console.log("Starting web socket, subscription ID: ", subscriptionId);
  })();
}
