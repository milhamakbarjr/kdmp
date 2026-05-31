import { createFileRoute } from "@tanstack/react-router"

import { ComingSoon } from "@/components/coming-soon"

export const Route = createFileRoute("/reconciliation")({
  component: ReconciliationPage,
})

function ReconciliationPage() {
  return (
    <ComingSoon
      title="Reconciliation"
      description="Match delivered quantities against POD, settle exceptions, close the day."
      sprint="Coming in Sprint 4"
      bullets={[
        "Wave close out with POD review and credit notes.",
        "Variance report by SKU and store.",
        "Export to CSV for finance hand off.",
      ]}
    />
  )
}
