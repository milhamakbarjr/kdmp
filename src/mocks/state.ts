import { create } from 'zustand'
import type {
  DC,
  Exception,
  InferredStock,
  Order,
  OrderLine,
  OrderStatus,
  POD,
  Role,
  SKU,
  ScenarioId,
  Store,
  Truck,
  User,
  Wave,
} from './types'
import calmTuesday from './scenarios/calm-tuesday'
import exceptionFriday from './scenarios/exception-friday'
import endOfMonthSurge from './scenarios/end-of-month-surge'
import { getDemoNow } from './clock'

export interface MockDataSlice {
  dcs: DC[]
  stores: Store[]
  skus: SKU[]
  inferredStock: InferredStock[]
  orders: Order[]
  orderLines: OrderLine[]
  waves: Wave[]
  trucks: Truck[]
  users: User[]
  exceptions: Exception[]
  pods: POD[]
}

export interface MockState extends MockDataSlice {
  currentRole: Role
  currentScenario: ScenarioId
  setCurrentRole: (role: Role) => void
  setCurrentScenario: (id: ScenarioId) => void
  resetToScenario: (id: ScenarioId) => void
}

const SCENARIOS: Record<ScenarioId, MockDataSlice> = {
  'calm-tuesday': calmTuesday,
  'exception-friday': exceptionFriday,
  'end-of-month-surge': endOfMonthSurge,
}

function cloneSlice(slice: MockDataSlice): MockDataSlice {
  return {
    dcs: slice.dcs.map((x) => ({ ...x })),
    stores: slice.stores.map((x) => ({ ...x })),
    skus: slice.skus.map((x) => ({ ...x })),
    inferredStock: slice.inferredStock.map((x) => ({ ...x })),
    orders: slice.orders.map((x) => ({ ...x })),
    orderLines: slice.orderLines.map((x) => ({ ...x })),
    waves: slice.waves.map((x) => ({ ...x, order_ids: [...x.order_ids] })),
    trucks: slice.trucks.map((x) => ({ ...x })),
    users: slice.users.map((x) => ({ ...x })),
    exceptions: slice.exceptions.map((x) => ({ ...x })),
    pods: slice.pods.map((x) => ({ ...x })),
  }
}

const DEFAULT_SCENARIO: ScenarioId = 'calm-tuesday'
const DEFAULT_ROLE: Role = 'ops-manager'

export const useMockStore = create<MockState>((set, get) => ({
  ...cloneSlice(SCENARIOS[DEFAULT_SCENARIO]),
  currentRole: DEFAULT_ROLE,
  currentScenario: DEFAULT_SCENARIO,
  setCurrentRole: (role) => set({ currentRole: role }),
  setCurrentScenario: (id) => {
    get().resetToScenario(id)
  },
  resetToScenario: (id) => {
    set({
      ...cloneSlice(SCENARIOS[id]),
      currentScenario: id,
    })
  },
}))

export function selectStoresForDC(state: MockState, dcId: string): Store[] {
  return state.stores.filter((s) => s.home_dc_id === dcId)
}

export function selectOrdersByStatus(state: MockState, status: OrderStatus): Order[] {
  return state.orders.filter((o) => o.status === status)
}

export function selectExceptionsToday(state: MockState): Exception[] {
  const now = getDemoNow()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  return state.exceptions.filter((e) => new Date(e.created_at).getTime() >= startOfDay)
}

export function selectStoreById(state: MockState, id: string): Store | undefined {
  return state.stores.find((s) => s.id === id)
}
