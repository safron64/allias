// store/TeamStore.js
import { create } from 'zustand'
import { teams } from '../data/teams'
import { getRandomTeams } from '../utils/getRandomTeams'

const useTeamStore = create(set => ({
	selectedTeams: getRandomTeams(teams, 2), // Начальное состояние команд
	addTeam: () => {
		set(state => {
			if (state.selectedTeams.length >= 4) return state
			const availableTeams = teams.filter(
				team => !state.selectedTeams.includes(team)
			)
			const newTeam = getRandomTeams(availableTeams, 1)[0]
			return { selectedTeams: [...state.selectedTeams, newTeam] }
		})
	},
	removeTeam: team => {
		set(state => {
			if (state.selectedTeams.length <= 2) return state
			return {
				selectedTeams: state.selectedTeams.filter(t => t !== team),
			}
		})
	},
}))

export default useTeamStore
