import {ApiResponse} from "../../request"
import {WellKnownConnection} from "../../schema/connection"
import {GlobalCounterpartiesSearchParams, GlobalCounterparty} from "../../schema/counterparty"

export interface UnauthenticatedRequests {
  getGlobalCounterparties: (
    params?: GlobalCounterpartiesSearchParams
  ) => Promise<ApiResponse<GlobalCounterparty[]>>

  listConnections: () => Promise<WellKnownConnection[]>
  listAPIConnections: () => Promise<WellKnownConnection[]>
  listTestConnections: () => Promise<WellKnownConnection[]>
  listBetaConnections: () => Promise<WellKnownConnection[]>
  listPaymentsConnections: () => Promise<WellKnownConnection[]>
  getOpenIdConfig: () => Promise<unknown>
}
