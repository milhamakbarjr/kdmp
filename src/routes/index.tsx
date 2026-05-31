import { createFileRoute } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { Alert02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useMockStore } from "@/mocks/state"
import type { Order, OrderStatus, Exception, Store } from "@/mocks/types"

export const Route = createFileRoute("/")({ component: TodayPage })

function countByStatus(orders: Order[] | undefined, statuses: OrderStatus[]) {
  if (!orders) return 0
  return orders.filter((o) => statuses.includes(o.status)).length
}

function TodayPage() {
  const orders = useMockStore((s) => s.orders) as Order[] | undefined
  const exceptions = useMockStore((s) => s.exceptions) as
    | Exception[]
    | undefined
  const stores = useMockStore((s) => s.stores) as Store[] | undefined
  const role = useMockStore((s) => s.currentRole)

  const pending = countByStatus(orders, ["submitted"])
  const inPick = countByStatus(orders, ["confirmed", "picking"])
  const inDispatch = countByStatus(orders, ["picked"])
  const inTransit = countByStatus(orders, ["in_transit"])
  const exceptionCount = exceptions?.length ?? 0

  const storeName = (id: string) =>
    stores?.find((s) => s.id === id)?.name ?? id

  const heading =
    role === "store"
      ? "Your store, today"
      : role === "driver"
        ? "Your route, today"
        : role === "exec"
          ? "Network at a glance"
          : "Today at the DC"

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            {heading}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Snapshot for Tuesday, 26 May. Numbers update as you switch
            scenarios.
          </p>
        </div>
        <Badge variant="secondary" className="font-normal">
          {orders?.length ?? 0} active orders
        </Badge>
      </header>

      <section
        aria-label="Pipeline status"
        className="grid grid-cols-2 gap-3 md:grid-cols-12"
      >
        <Card size="sm" className="md:col-span-5">
          <CardHeader>
            <CardDescription>Pending approval</CardDescription>
            <CardTitle className="font-heading text-5xl font-semibold tabular-nums">
              {pending}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Suggested orders awaiting review</span>
            <Button variant="ghost" size="sm" className="-mr-2 h-7 px-2">
              Review
              <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={2} />
            </Button>
          </CardContent>
        </Card>

        <div className="md:col-span-7 grid grid-cols-2 gap-3 md:grid-cols-4">
          <KpiTile label="In pick" value={inPick} />
          <KpiTile label="In dispatch" value={inDispatch} />
          <KpiTile label="In transit" value={inTransit} />
          <KpiTile
            label="Exceptions"
            value={exceptionCount}
            tone={exceptionCount > 0 ? "warn" : "neutral"}
          />
        </div>
      </section>

      <Separator className="my-8" />

      <section aria-label="Open exceptions" className="grid gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-lg font-semibold">
              Open exceptions
            </h2>
            <p className="text-sm text-muted-foreground">
              Refused, damaged, or undeliverable orders that need a call.
            </p>
          </div>
          <Button variant="outline" size="sm">
            See all
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            {exceptions && exceptions.length > 0 ? (
              <ul className="divide-y divide-border">
                {exceptions.slice(0, 5).map((ex) => (
                  <li
                    key={ex.id}
                    className="flex items-start gap-3 px-5 py-4 text-sm"
                  >
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                      <HugeiconsIcon
                        icon={Alert02Icon}
                        strokeWidth={2}
                        className="size-4"
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <span className="font-medium">
                          {storeName(orderToStoreId(orders, ex.order_id))}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Order {ex.order_id}
                        </span>
                      </div>
                      <p className="mt-0.5 text-muted-foreground">
                        {reasonLabel(ex.reason_code)}, {ex.note}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="-mr-1">
                      Resolve
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-5 py-10 text-center text-sm text-muted-foreground">
                No exceptions. The day is running clean.
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

function KpiTile({
  label,
  value,
  tone = "neutral",
}: {
  label: string
  value: number
  tone?: "neutral" | "warn"
}) {
  return (
    <Card size="sm" className="shadow-none ring-1 ring-border">
      <CardContent className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span
          className={
            tone === "warn" && value > 0
              ? "font-heading text-2xl font-semibold tabular-nums text-destructive"
              : "font-heading text-2xl font-semibold tabular-nums"
          }
        >
          {value}
        </span>
      </CardContent>
    </Card>
  )
}

function orderToStoreId(
  orders: Order[] | undefined,
  orderId: string,
): string {
  return orders?.find((o) => o.id === orderId)?.store_id ?? "unknown"
}

function reasonLabel(code: string): string {
  switch (code) {
    case "store_closed":
      return "Store closed"
    case "refused":
      return "Refused"
    case "damaged":
      return "Damaged on arrival"
    case "address_wrong":
      return "Address mismatch"
    default:
      return "Other"
  }
}
