import { create } from 'zustand'

const useScoreStore = create(set => ({
	wordsArray: [],
	setWordsArray: newWordsArray =>
		set(state => ({ wordsArray: [...state.wordsArray, ...newWordsArray] })),
	resetWordsArray: () => set(() => ({ wordsArray: [] })),

	scores: {},
	currentTeamIndex: 0,

	setTeams: teams =>
		set(state => ({
			scores: teams.reduce((acc, team) => ({ ...acc, [team]: 0 }), {}),
			currentTeamIndex: 0,
		})),

	updateScore: (team, score) =>
		set(state => ({
			scores: {
				...state.scores,
				[team]: (state.scores[team] || 0) + score,
			},
		})),

	nextTeam: teams =>
		set(state => ({
			currentTeamIndex: (state.currentTeamIndex + 1) % teams.length,
		})),

	getCurrentTeam: () => set(state => state.teams[state.currentTeamIndex]),
}))

export default useScoreStore
