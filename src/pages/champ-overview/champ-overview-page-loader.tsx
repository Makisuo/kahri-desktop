import { getAllChampions } from "~/lib/league-api/ddragon"
import type { Champion } from "~/lib/league-api/types"

export const champOverviewPageLoader = async (): Promise<Champion[]> => {
	return await getAllChampions()
}
