import { create } from 'zustand'

const useSettingsStore = create(set => ({
	wordCount: 40,
	roundTime: 70,
	penaltyEnabled: true,
	commonLastWord: false,
	soundEnabled: true,
	setWordCount: value => set({ wordCount: value }),
	setRoundTime: value => set({ roundTime: value }),
	setPenaltyEnabled: value => set({ penaltyEnabled: value }),
	setCommonLastWord: value => set({ commonLastWord: value }),
	setSoundEnabled: value => set({ soundEnabled: value }),
}))

export default useSettingsStore
