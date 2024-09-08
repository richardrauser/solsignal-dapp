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
        <h1 className={title()}>Configure&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>Solana Signals&nbsp;</h1>
        <br />
        <h1 className={title()}>to alert you whenever onchain events occur.</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Your first 5 signals are free!
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
