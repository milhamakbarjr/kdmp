import { createFileRoute } from "@tanstack/react-router"

import { ComingSoon } from "@/components/coming-soon"

export const Route = createFileRoute("/stores")({ component: StoresPage })

function StoresPage() {
  return (
    <ComingSoon
      title="Stores"
      description="Directory of retail outlets served by the network, by cluster and DC."
      sprint="Coming in Sprint 3"
      bullets={[
        "Search and filter by cluster, DC, or contact.",
        "Per-store history, inferred stock, and order cadence.",
        "Flag stores with repeated refusals for supervisor follow up.",
      ]}
    />
  )
}
