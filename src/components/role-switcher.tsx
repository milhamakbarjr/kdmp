import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMockStore } from "@/mocks/state"
import type { Role } from "@/mocks/types"

const ROLES: { id: Role; persona: string; title: string }[] = [
  { id: "ops-manager", persona: "Rina", title: "DC Ops Manager" },
  { id: "supervisor", persona: "Pak Heru", title: "Cluster Supervisor" },
  { id: "exec", persona: "Bu Sari", title: "Executive" },
  { id: "store", persona: "Budi", title: "Store Owner" },
  { id: "driver", persona: "Asep", title: "Driver" },
]

export function RoleSwitcher() {
  const role = useMockStore((s) => s.currentRole)
  const setRole = useMockStore((s) => s.setCurrentRole)
  const current = ROLES.find((r) => r.id === role) ?? ROLES[0]

  return (
    <Select
      value={role}
      onValueChange={(value) => {
        if (value) setRole(value)
      }}
    >
      <SelectTrigger size="sm" aria-label="Switch persona" className="min-w-52">
        <SelectValue>
          <span className="font-medium">{current.persona}</span>
          <span className="text-muted-foreground">, {current.title}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {ROLES.map((r) => (
          <SelectItem key={r.id} value={r.id}>
            <span className="font-medium">{r.persona}</span>
            <span className="text-muted-foreground">, {r.title}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
