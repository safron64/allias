import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	PanResponder,
	Modal,
	Animated,
} from 'react-native'
import { BackHandler } from 'react-native'
import styled from 'styled-components/native'
import useTeamStore from '../store/TeamStore'
import useSettingsStore from '../store/SettingsStore'
import useScoreStore from '../store/useScoreStore'
import SelectTeamModal from '../components/ui/selectTeamModal'
import getWordsForGame from '../utils/getWordsForGame'
import { data } from './../data/words'

const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: #f5f5f5;
`

const TopBar = styled.View`
	position: absolute;
	top: 0;
	width: 100%;
	background-color: #ff9500;
	padding-top: 40px;
	padding-bottom: 10px;
	justify-content: center;
	align-items: center;
`

const TopBarText = styled.Text`
	font-size: 18px;
	color: white;
`

const Score = styled.Text`
	font-size: 48px;
	color: white;
	font-weight: bold;
`

const WordContainer = styled(Animated.View)`
	flex: 1;
	justify-content: center;
	align-items: center;
	width: 90%;
	height: 40%;
`

const WordText = styled.Text`
	font-size: 28px;
	font-weight: bold;
	text-align: center;
`

const BottomBar = styled.View`
	position: absolute;
	bottom: 0;
	width: 100%;
	background-color: #808080;
	padding-top: 10px;
	padding-bottom: 20px;
	justify-content: center;
	align-items: center;
`

const BottomBarText = styled.Text`
	font-size: 18px;
	color: white;
`

const ScoreBottom = styled.Text`
	font-size: 48px;
	color: white;
	font-weight: bold;
`

const Timer = styled.Text`
	font-size: 24px;
	color: white;
	margin-top: 5px;
`

const StopButton = styled(TouchableOpacity)`
	background-color: #d3d3d3;
	padding: 10px 30px;
	border-radius: 25px;
	position: absolute;
	left: 10px;
	bottom: 20px;
`

const StopButtonText = styled.Text`
	font-size: 18px;
	color: black;
	font-weight: bold;
`

const StartButton = styled(TouchableOpacity)`
	background-color: #4caf50;
	padding: 20px 40px;
	border-radius: 25px;
`

const StartButtonText = styled.Text`
	font-size: 24px;
	color: white;
	font-weight: bold;
`

const GameScreen = ({ navigation }) => {
	const [isGameStarted, setIsGameStarted] = useState(false)
	const [currentWord, setCurrentWord] = useState('')
	const [guessedWords, setGuessedWords] = useState(0)
	const [skippedWords, setSkippedWords] = useState(0)
	const [wordsArray, setWordsArray] = useState([]) // Массив объектов со статусами слов
	const [showModal, setShowModal] = useState(false)
	const [timerEnded, setTimerEnded] = useState(false)
	const timerRef = useRef(null)

	const { selectedTeams } = useTeamStore()
	const { roundTime, wordCount, difficultyLevel } = useSettingsStore()
	const [timer, setTimer] = useState(roundTime)
	const { currentTeamIndex } = useScoreStore() // добавляем доступ к score
	const currentTeam = selectedTeams[currentTeamIndex]

	// Мемоизация массива слов
	const words = useMemo(
		() => getWordsForGame(data, 500, difficultyLevel),
		[data, difficultyLevel]
	)

	const [wordIndex, setWordIndex] = useState(0)

	useEffect(() => {
		const backAction = () => {
			// Блокируем кнопку "Назад" только на этом экране
			return true
		}

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction
		)

		return () => backHandler.remove()
	}, [])

	useEffect(() => {
		if (isGameStarted && timer > 0) {
			const interval = setInterval(() => {
				setTimer(prevTimer => prevTimer - 1)
				timerRef.current = timerRef.current - 1
			}, 1000)

			return () => clearInterval(interval)
		} else if (timer === 0) {
			setTimerEnded(true)
		}
	}, [isGameStarted, timer])

	// Мемоизация функции nextWord
	const nextWord = useCallback(() => {
		setWordIndex(prevIndex => {
			const newIndex = prevIndex + 1
			if (newIndex < words.length) {
				setCurrentWord(words[newIndex])
				return newIndex
			} else {
				setIsGameStarted(false)
				return prevIndex
			}
		})
	}, [words])

	// Мемоизация функции startGame
	const startGame = useCallback(() => {
		setIsGameStarted(true)
		setTimer(timerRef.current > 0 ? timerRef.current : roundTime)
		setCurrentWord(words[wordIndex])
		setTimerEnded(false)
	}, [roundTime, words, wordIndex])

	// Мемоизация функции handleTeamSelect
	const handleTeamSelect = useCallback(
		teamName => {
			setShowModal(false)
			navigation.navigate('RoundResultsScreen', {
				wordsArray: wordsArray, // обновленный массив со статусами
			})
		},
		[navigation, wordsArray]
	)

	// Мемоизация функции handleSwipeUp
	const handleSwipeUp = useCallback(() => {
		if (timer > 0 || timerEnded) {
			if (timerEnded) {
				setWordsArray(prevArray => [
					...prevArray,
					{ word: words[wordIndex], status: true },
				])
				setShowModal(true)
			} else {
				setGuessedWords(prev => prev + 1)
				setWordsArray(prevArray => [
					...prevArray,
					{ word: words[wordIndex], status: true },
				])
				nextWord()
			}
		}
	}, [timer, timerEnded, words, wordIndex, nextWord])

	// Мемоизация функции handleSwipeDown
	const handleSwipeDown = useCallback(() => {
		if (timer > 0 || timerEnded) {
			if (timerEnded) {
				const updatedWordsArray = [
					...wordsArray,
					{ word: words[wordIndex], status: undefined },
				]
				setWordsArray(updatedWordsArray)
				navigation.navigate('RoundResultsScreen', {
					wordsArray: updatedWordsArray,
				})
			} else {
				setSkippedWords(prev => prev + 1)
				setWordsArray(prevArray => [
					...prevArray,
					{ word: words[wordIndex], status: false },
				])
				nextWord()
			}
		}
	}, [timer, timerEnded, words, wordIndex, wordsArray, navigation, nextWord])

	// Мемоизация panResponder
	const panResponder = useMemo(
		() =>
			PanResponder.create({
				onMoveShouldSetPanResponder: () => true,
				onPanResponderRelease: (evt, gestureState) => {
					if (!isGameStarted) return // Проверка на состояние игры и таймера

					if (gestureState.dy < -50) {
						handleSwipeUp()
					} else if (gestureState.dy > 50) {
						handleSwipeDown()
					}
				},
			}),
		[isGameStarted, handleSwipeUp, handleSwipeDown]
	)

	return (
		<Container>
			{/* Верхняя панель с отгаданными словами */}
			<TopBar>
				<TopBarText>{currentTeam}</TopBarText>
				<Score>{guessedWords}</Score>
				<TopBarText>ОТГАДАНО</TopBarText>
			</TopBar>

			{/* Контейнер для слова */}
			<WordContainer {...panResponder.panHandlers}>
				{isGameStarted ? (
					<WordText>{currentWord}</WordText>
				) : (
					<StartButton onPress={startGame}>
						<StartButtonText>Начало</StartButtonText>
					</StartButton>
				)}
			</WordContainer>

			{/* Нижняя панель с пропущенными словами и таймером */}
			<BottomBar>
				<BottomBarText>ПРОПУЩЕНО</BottomBarText>
				<ScoreBottom>{skippedWords}</ScoreBottom>
				{/* Показать таймер или финальное слово */}
				{timerEnded ? (
					<Timer>Финальное слово</Timer>
				) : (
					<Timer>{`00:${timer < 10 ? `0${timer}` : timer}`}</Timer>
				)}
			</BottomBar>

			{/* Кнопка Стоп - скрываем, если таймер закончился */}
			{isGameStarted && !timerEnded && (
				<StopButton onPress={() => setIsGameStarted(false)}>
					<StopButtonText>СТОП</StopButtonText>
				</StopButton>
			)}

			{/* Модальное окно для выбора команды */}
			<SelectTeamModal
				visible={showModal}
				selectedTeams={selectedTeams}
				handleTeamSelect={handleTeamSelect}
			/>
		</Container>
	)
}

export default React.memo(GameScreen)
