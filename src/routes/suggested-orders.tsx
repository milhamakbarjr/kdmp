import { createFileRoute } from "@tanstack/react-router"

import { ComingSoon } from "@/components/coming-soon"

export const Route = createFileRoute("/suggested-orders")({
  component: SuggestedOrdersPage,
})

function SuggestedOrdersPage() {
  return (
    <ComingSoon
      title="Suggested orders"
      description="Engine-proposed quantities per store, ready for approval, edit, or hold."
      sprint="Coming in Sprint 2"
      bullets={[
        "Table grouped by cluster with proposed quantities and days of cover.",
        "Inline edit with reason codes, batch approve, hold for review.",
        "Diff against last order to flag unusual swings.",
      ]}
    />
  )
}
