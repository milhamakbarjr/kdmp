import { createFileRoute } from "@tanstack/react-router"

import { ComingSoon } from "@/components/coming-soon"

export const Route = createFileRoute("/in-transit")({
  component: InTransitPage,
})

function InTransitPage() {
  return (
    <ComingSoon
      title="In transit"
      description="Track active waves, stops completed, and live exceptions."
      sprint="Coming in Sprint 3"
      bullets={[
        "Wave list with progress bars and ETA per stop.",
        "Exception drawer with photo, reason code, and call action.",
        "Driver status pings from the field, simulated for the demo.",
      ]}
    />
  )
}
