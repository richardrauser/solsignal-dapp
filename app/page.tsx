import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>📈 😎</h1>
        <br />
        <br />
        <h1 className={title()}>Configure&nbsp;</h1>
        <h1 className={title({ color: "green" })}>Solana alerts&nbsp;</h1>
        <br />
        <h1 className={title()}>to notify you when onchain events occur.</h1>
        <p className={"mt-4 mb-4 italic"}>
          {`"`}Notify me when wallet 0x123...456 makes a SOL transaction{`"`}
          <br />
          {`"`}Notify me when wallet 0x123...456{"'"}s balance falls below 10
          SOL
          {`"`}
          <br />
          {`"`}Notify me when wallet 0x123...456 receives SOL{`"`}
        </p>{" "}
        <h2 className={subtitle({ class: "mt-4" })}>
          Your first 5 alerts are free!
        </h2>
      </div>

      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.navItems[0].href}
        >
          Get started
        </Link>
        {/* <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link> */}
      </div>

      {/* <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            // Get started by editing <Code color="primary">app/page.tsx</Code>
            Coming soon...
          </span>
        </Snippet>
      </div> */}
    </section>
  );
}
