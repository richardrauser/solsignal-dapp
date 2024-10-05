import { PageTitle } from "@/components/pageTitle";
import { Panel } from "@/components/panel";
import { title } from "@/components/primitives";
import { Snippet } from "@nextui-org/snippet";
import { Link } from "@nextui-org/link";

export default function AboutPage() {
  return (
    <div className="text-left">
      <Panel>
        <PageTitle>About</PageTitle>
        <p className="m-8">
          SolSignal.xyz is a web3 application that allows you to set up alerts
          for onchain Solana events. It was initially built in 2024 by{" "}
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
            Richard Rauser
          </Link>{" "}
          as part of the
          <Link
            isExternal
            className=""
            href="https://www.colosseum.org/radar"
            title="Colossuem Radar"
          >
            Solana Radar Global Hackathon
          </Link>
          .
        </p>

        <p className="m-8">
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
      </Panel>
    </div>
  );
}
