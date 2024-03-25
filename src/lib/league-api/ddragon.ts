import { cache } from "@solidjs/router"
import type { Champion } from "./types"

export const getCurrentVersion = async () => {
	const respond = await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
	const result = await respond.json()
	return result[1]
}

//Frontendrequest
export const getChampionById = async (id: number) => {
	const version = await getCurrentVersion()
	const response = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
	const { data } = await response.json()
	for (const i in data) {
		if (Number.parseInt(data[i].key) === id) {
			return data[i]
		}
	}
}

export const getChampionByName = async (name: string) => {
	const version = await getCurrentVersion()
	const response = await fetch(`https://cdn.communitydragon.org/${version}/champion/${name}/data`)
	const result = await response.json()

	return result
}

export const getChampionIdByName = async (name: string) => {
	const version = await getCurrentVersion()
	const response = await fetch(`https://cdn.communitydragon.org/${version}/champion/${name}/data`)
	const data = await response.json()
	return data.id
}

export const getAllChampions = cache(async () => {
	const version = await getCurrentVersion()
	const reponse = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)

	const result = await reponse.json()
	return Object.values(result.data) as Champion[]
}, "all_champions")

export const getRandomChampion = async () => {
	const version = await getCurrentVersion()
	const reponse = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
	const { data } = await reponse.json()
	return data[Object.keys(data)[Math.floor(Math.random() * Math.floor(Object.keys(data).length))]]
}
