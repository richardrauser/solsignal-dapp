import { Link } from "@nextui-org/link";

import { PageTitle } from "@/components/pageTitle";
import { Panel } from "@/components/panel";

export default function AboutPage() {
  return (
    <div className="text-left">
      <Panel>
        <PageTitle>About SolSignal v0.2</PageTitle>
        <p className="m-4">
          SolSignal.xyz is a web3 application that allows you to set up alerts
          for onchain Solana events. SolSignal is simply the easiest way to stay
          abreast of Solana events. It was initially built in September late
          2024 by{" "}
          <Link
            isExternal
            className=""
            href="https://www.raaza.net"
            title="raaza - web3 tech consultancy"
          >
            raaza
          </Link>{" "}
          and{" "}
          <Link
            isExternal
            className=""
            href="https://www.x.com/richardrauser"
            title="Richard Rauser on X.com"
          >
            Richard Rauser.
          </Link>
          {/* as part of the
          <Link
            isExternal
            className=""
            href="https://www.colosseum.org/radar"
            title="Colossuem Radar"
          >
            Solana Radar Global Hackathon
          </Link>
          . */}
        </p>

        <h2 className="font-semibold text-[1.2em] leading-9 mb-4">
          Tech Stack
        </h2>
        <p className="m-4">
          Frontend:{" "}
          <Link isExternal className="" href="https://vercel.com">
            Vercel
          </Link>
          <br />
          UI:{" "}
          <Link isExternal className="" href="https://nextui.org/">
            NextUI
          </Link>
          <br />
          Backend:{" "}
          <Link isExternal className="" href="https://firebase.google.com/">
            Firebase
          </Link>
          {", "}
          <Link
            isExternal
            className=""
            href="https://www.quicknode.com/functions"
          >
            QuickNode Functions
          </Link>
          <br />
          Blockchain:{" "}
          <Link
            isExternal
            className=""
            href="https://solana-labs.github.io/solana-web3.js/"
          >
            Solana web3
          </Link>
          <br />
          RPC:{" "}
          <Link isExternal className="" href="https://quicknode.com/">
            QuickNode
          </Link>
          <br />
          Webhooks:{" "}
          <Link isExternal className="" href="https://www.helius.dev/">
            Helius
          </Link>
          <br />
        </p>

        <h2 className="font-semibold text-[1.2em] leading-9 mb-4">
          Source code
        </h2>
        <p className="m-4">
          The source code for SolSignal.xyz is available here:{" "}
          <Link
            isExternal
            className=""
            href="https://github.com/richardrauser/solsignal-cloud-functions"
          >
            GitHub - SolSignal Cloud Functions
          </Link>
          <br />
          <Link
            isExternal
            className=""
            href="https://github.com/richardrauser/solsignal-dapp"
          >
            GitHub - SolSignal dApp
          </Link>
        </p>

        <h2 className="font-semibold text-[1.2em] leading-9 mb-4">
          Upcoming features
        </h2>
        <p className="m-4">
          This is just the beginning for SolSignal.xyz, with many new features
          in the works. These include the folowing:
        </p>
        <ol className="list-decimal text-left m-8">
          <li>
            <b>More alert types:</b> NFT alerts, whale alerts, etc
          </li>
          <li>
            <b>More alert channels:</b> SMS, push notifications, etc
          </li>
          <li>
            <b>More customization options:</b> this, that, and the other thing
          </li>
        </ol>

        <h2 className="font-semibold text-[1.2em] leading-9 mb-4">Feedback</h2>
        <p className="m-4">
          Send an email to{" "}
          <Link isExternal className="" href="mailto:info@solsignal.xyz">
            info@solsignal.xyz
          </Link>{" "}
          with any feedback or to discuss this project!
        </p>
      </Panel>
    </div>
  );
}
