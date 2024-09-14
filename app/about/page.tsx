import { title } from '@/components/primitives'
import { Snippet } from '@nextui-org/snippet'

export default function AboutPage() {
  return (
    <div>
      <h1 className={title()}>About</h1>
      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            {/* Get started by editing <Code color="primary">app/page.tsx</Code> */}
            Coming soon...
          </span>
        </Snippet>
      </div>
      <div className="mt-8">
        Alert channels: - SMS - WhatsApp Alert types: - Transaction - Balance - Price
      </div>
    </div>
  )
}
