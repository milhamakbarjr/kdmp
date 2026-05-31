import { createFileRoute } from "@tanstack/react-router"

import { ComingSoon } from "@/components/coming-soon"

export const Route = createFileRoute("/dispatch")({ component: DispatchPage })

function DispatchPage() {
  return (
    <ComingSoon
      title="Dispatch"
      description="Build waves, assign trucks and drivers, lock the manifest."
      sprint="Coming in Sprint 2"
      bullets={[
        "Drag orders into waves, balance against truck capacity.",
        "Driver assignment with last-mile route preview.",
        "Print or share the manifest as PDF.",
      ]}
    />
  )
}
