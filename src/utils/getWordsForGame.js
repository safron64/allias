import { shuffle } from 'lodash' // Библиотека для перемешивания массива

const getWordsForGame = (data, wordCount, difficultyLevel) => {
	const wordsRate1 = data.filter(word => word.rate === '1')
	const wordsRate2 = data.filter(word => word.rate === '2')
	const wordsRate3 = data.filter(word => word.rate === '3')

	let selectedWords = []

	if (difficultyLevel === 1) {
		// Уровень 1: 90% rate 1, 10% rate 2
		const countRate1 = Math.round(wordCount * 0.9)
		const countRate2 = wordCount - countRate1

		selectedWords = [
			...wordsRate1.slice(0, countRate1),
			...wordsRate2.slice(0, countRate2),
		]
	} else if (difficultyLevel === 2) {
		// Уровень 2: 10% rate 1, 88% rate 2, 2% rate 3
		const countRate1 = Math.round(wordCount * 0.1)
		const countRate2 = Math.round(wordCount * 0.88)
		const countRate3 = wordCount - countRate1 - countRate2

		selectedWords = [
			...wordsRate1.slice(0, countRate1),
			...wordsRate2.slice(0, countRate2),
			...wordsRate3.slice(0, countRate3),
		]
	} else if (difficultyLevel === 3) {
		// Уровень 3: 30% rate 2, 70% rate 3
		const countRate2 = Math.round(wordCount * 0.3)
		const countRate3 = wordCount - countRate2

		selectedWords = [
			...wordsRate2.slice(0, countRate2),
			...wordsRate3.slice(0, countRate3),
		]
	}

	// Если выбранных слов недостаточно, добавляем слова из других уровней
	if (selectedWords.length < wordCount) {
		const remainingWords = wordCount - selectedWords.length
		const additionalWords = [
			...wordsRate1.slice(selectedWords.length),
			...wordsRate2.slice(selectedWords.length),
			...wordsRate3.slice(selectedWords.length),
		]
		selectedWords = [
			...selectedWords,
			...additionalWords.slice(0, remainingWords),
		]
	}

	// Перемешиваем слова
	return shuffle(selectedWords).map(word => word.name)
}

export default getWordsForGame
