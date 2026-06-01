import { apiFetch } from './api'
import { Station } from '@/types/station'

export function getStations() {
  return apiFetch<Station[]>('/stations')
}

