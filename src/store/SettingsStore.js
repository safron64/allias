import { create } from 'zustand'

const useSettingsStore = create(set => ({
	wordCount: 40,
	roundTime: 40,
	penaltyEnabled: true,
	commonLastWord: false,
	soundEnabled: true,
	difficultyLevel: 2,
	setWordCount: value => set({ wordCount: value }),
	setRoundTime: value => set({ roundTime: value }),
	setPenaltyEnabled: value => set({ penaltyEnabled: value }),
	setCommonLastWord: value => set({ commonLastWord: value }),
	setSoundEnabled: value => set({ soundEnabled: value }),
	setDifficultyLevel: value => set({ difficultyLevel: value }),
}))

export default useSettingsStore
