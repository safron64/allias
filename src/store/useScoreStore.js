// store/ScoreStore.js
import { create } from 'zustand'

const useScoreStore = create(set => ({
	scores: {},
	currentTeamIndex: 0,

	// Инициализация команд
	setTeams: teams =>
		set(state => ({
			scores: teams.reduce((acc, team) => ({ ...acc, [team]: 0 }), {}),
			currentTeamIndex: 0,
		})),

	// Обновление счета команды
	updateScore: (team, score) =>
		set(state => ({
			scores: {
				...state.scores,
				// Если для команды нет значения, то инициализируем его нулем
				[team]: (state.scores[team] || 0) + score,
			},
		})),

	// Переход к следующей команде
	nextTeam: teams =>
		set(state => ({
			currentTeamIndex: (state.currentTeamIndex + 1) % teams.length,
		})),

	// Получение текущей команды
	getCurrentTeam: () => set(state => state.teams[state.currentTeamIndex]),
}))

export default useScoreStore
