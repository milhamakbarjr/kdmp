import { createFileRoute } from "@tanstack/react-router"

import { ComingSoon } from "@/components/coming-soon"

export const Route = createFileRoute("/catalog")({ component: CatalogPage })

function CatalogPage() {
  return (
    <ComingSoon
      title="Catalog"
      description="SKU master with default burn rate, reorder thresholds, and pricing."
      sprint="Coming in Sprint 4"
      bullets={[
        "Categorized list (snacks, beverages, toiletries) with quick search.",
        "Per-SKU detail showing demand history and substitution candidates.",
        "Edit reorder thresholds with audit notes.",
      ]}
    />
  )
}
