import { EconomicEvent } from '@/app/types/economic';
import {
  getEconomicCalendarPage,
  getEconomicEventBySlug,
  EconomicCalendarFilters,
} from '@/app/lib/providers/economicCalendarProvider';

export async function getEconomicEvents(): Promise<EconomicEvent[]> {
  const page = await getEconomicCalendarPage({ page: 1, pageSize: 1000 });
  return page.events;
}

export async function filterEconomicEvents(
  filters: EconomicCalendarFilters = {}
): Promise<EconomicEvent[]> {
  const page = await getEconomicCalendarPage(filters);
  return page.events;
}

export { getEconomicEventBySlug, getEconomicCalendarPage, EconomicCalendarFilters };
