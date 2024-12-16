import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
	TouchableOpacity,
	PanResponder,
	BackHandler,
	Animated,
} from 'react-native'
import styled from 'styled-components/native'
import useTeamStore from '../store/TeamStore'
import useSettingsStore from '../store/SettingsStore'
import useScoreStore from '../store/useScoreStore'
import SelectTeamModal from '../components/ui/SelectTeamModal'
import getWordsForGame from '../utils/getWordsForGame'
import { data } from './../data/words'

import swipeUpSound from '../../assets/swipe-up.mp3'
import swipeDownSound from '../../assets/swipe-down.mp3'
import timerEndSound from '../../assets/timer-end.mp3'
import playSound from '../utils/playSound'

const GameScreen = ({ navigation }) => {
	const { selectedTeams } = useTeamStore()
	const [fontSize, setFontSize] = useState(32)

	const adjustFontSize = event => {
		const { width } = event.nativeEvent.layout

		if (width > 270) {
			setFontSize(prevFontSize => Math.max(prevFontSize - 2, 12))
		}
	}
	const { roundTime, wordCount, difficultyLevel } = useSettingsStore()
	const {
		currentTeamIndex,
		wordsArray: globalWordsArray,
		setWordsArray,
	} = useScoreStore()
	const currentTeam = selectedTeams[currentTeamIndex]

	const [isGameStarted, setIsGameStarted] = useState(false)
	const [isGamePaused, setIsGamePaused] = useState(false)
	const [currentWord, setCurrentWord] = useState('')
	const [guessedWords, setGuessedWords] = useState(0)
	const [skippedWords, setSkippedWords] = useState(0)
	const [localWordsArray, setLocalWordsArray] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [timerEnded, setTimerEnded] = useState(false)
	const [timer, setTimer] = useState(roundTime)
	const [words, setWords] = useState([])

	// Инициализация списка слов
	useEffect(() => {
		const initialWords = getWordsForGame(
			data,
			roundTime,
			difficultyLevel,
			globalWordsArray.map(item => item.word)
		)
		setWords(initialWords)
	}, [])
	console.log(words)

	// Блокировка кнопки "Назад"
	useEffect(() => {
		const backAction = () => true
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction
		)
		return () => backHandler.remove()
	}, [])

	// Таймер игры
	useEffect(() => {
		if (isGameStarted && !isGamePaused && timer > 0) {
			const interval = setInterval(() => {
				setTimer(prev => {
					if (prev === 1) {
						clearInterval(interval)
						setTimerEnded(true)
						setIsGameStarted(false)
						// Воспроизводим звук завершения таймера
						playSound(timerEndSound, 0.5)
					}
					return prev - 1
				})
			}, 1000)
			return () => clearInterval(interval)
		}
	}, [isGameStarted, isGamePaused, timer])

	// Показ следующего слова и удаление текущего из массива
	const showNextWord = useCallback(() => {
		if (words.length > 0) {
			const nextWord = words[0]
			setCurrentWord(nextWord)
			setWords(prevWords => prevWords.slice(1))
		} else {
			setIsGameStarted(false)
			setTimerEnded(true)
		}
	}, [words])

	// Начало игры
	const startGame = useCallback(() => {
		console.log('0')
		setIsGameStarted(true)
		console.log('1')
		setIsGamePaused(false)
		console.log('2')
		setTimer(roundTime)
		console.log('3')
		setTimerEnded(false)
		console.log('4')
		setGuessedWords(0)
		console.log('5')
		setSkippedWords(0)
		console.log('6')
		setLocalWordsArray([])
		console.log('7')
		showNextWord()
	}, [roundTime, showNextWord])

	// Обработка результата слова
	const handleWordStatus = useCallback(
		status => {
			const updatedWordsArray = [
				...localWordsArray,
				{ word: currentWord, status },
			]
			setLocalWordsArray(updatedWordsArray)

			// Обновляем глобальное состояние
			setWordsArray([{ word: currentWord, status }])

			if (status === true) {
				setGuessedWords(prev => prev + 1)
			} else if (status === false) {
				setSkippedWords(prev => prev + 1)
			}

			if (timerEnded) {
				if (status === true) {
					setShowModal(true)
				} else {
					navigation.navigate('RoundResultsScreen', {
						wordsArray: updatedWordsArray,
					})
				}
			} else {
				showNextWord()
			}
		},
		[
			localWordsArray,
			currentWord,
			timerEnded,
			navigation,
			showNextWord,
			setWordsArray,
		]
	)

	const handleTeamSelect = useCallback(
		teamName => {
			setShowModal(false)
			navigation.navigate('RoundResultsScreen', {
				wordsArray: localWordsArray,
			})
		},
		[navigation, localWordsArray]
	)

	const handleSwipeUp = useCallback(() => {
		if (!isGameStarted && !timerEnded) return
		if (isGamePaused) return
		handleWordStatus(true)
		playSound(swipeUpSound, 0.5)
	}, [isGameStarted, isGamePaused, timerEnded, handleWordStatus])

	const handleSwipeDown = useCallback(() => {
		if (!isGameStarted && !timerEnded) return
		if (isGamePaused) return
		handleWordStatus(false)
		playSound(swipeDownSound, 0.5)
	}, [isGameStarted, isGamePaused, timerEnded, handleWordStatus])

	// ПанРеспондер для обработки свайпов
	const panResponder = useMemo(
		() =>
			PanResponder.create({
				onMoveShouldSetPanResponder: () => true,
				onPanResponderRelease: (evt, gestureState) => {
					if (!isGameStarted && !timerEnded) return
					if (isGamePaused) return

					if (gestureState.dy < -50) {
						handleSwipeUp()
					} else if (gestureState.dy > 50) {
						handleSwipeDown()
					}
				},
			}),
		[
			isGameStarted,
			isGamePaused,
			timerEnded,
			handleSwipeUp,
			handleSwipeDown,
		]
	)

	return (
		<Container>
			{/* Верхняя панель */}
			<TopBar>
				<TopBarText>{currentTeam}</TopBarText>
				<Score>{guessedWords}</Score>
				<TopBarText>ОТГАДАНО</TopBarText>
			</TopBar>

			{/* Контейнер слова */}
			<WordContainer {...panResponder.panHandlers}>
				{isGameStarted || timerEnded ? (
					isGamePaused ? (
						<StartButton onPress={() => setIsGamePaused(false)}>
							<StartButtonText>Продолжить</StartButtonText>
						</StartButton>
					) : (
						<CircleBg>
							<WordText
								fontSize={fontSize}
								numberOfLines={3}
								onLayout={adjustFontSize}
							>
								{currentWord}
							</WordText>
						</CircleBg>
					)
				) : (
					<StartButton onPress={startGame}>
						<StartButtonText>Начало</StartButtonText>
					</StartButton>
				)}
			</WordContainer>

			{/* Нижняя панель */}
			<BottomBar>
				<BottomBarText>ПРОПУЩЕНО</BottomBarText>
				<ScoreBottom>{skippedWords}</ScoreBottom>
				{timerEnded ? (
					<Timer>Финальное слово</Timer>
				) : (
					<Timer>{`00:${timer < 10 ? `0${timer}` : timer}`}</Timer>
				)}
			</BottomBar>

			{/* Кнопка Стоп */}
			{isGameStarted && !timerEnded && !isGamePaused && (
				<StopButton onPress={() => setIsGamePaused(true)}>
					<StopButtonText>СТОП</StopButtonText>
				</StopButton>
			)}

			{/* Модальное окно выбора команды */}
			<SelectTeamModal
				visible={showModal}
				selectedTeams={selectedTeams}
				handleTeamSelect={handleTeamSelect}
			/>
		</Container>
	)
}

export default React.memo(GameScreen)

const CircleBg = styled.View`
	background-color: #4c4848;
	width: 300px;
	height: 300px;
	border-radius: 150px;
	justify-content: center;
	align-items: center;
	padding: 10px;
`

const WordText = styled.Text`
	font-size: ${props => props.fontSize}px;
	font-weight: bold;
	color: #fff;
	text-align: center;
	width: 90%;
`
const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: #282828;
`

const TopBar = styled.View`
	position: absolute;
	top: 0;
	width: 100%;
	background-color: #000;
	padding-top: 40px;
	padding-bottom: 10px;
	justify-content: center;
	align-items: center;
`

const TopBarText = styled.Text`
	font-size: 18px;
	color: #fff;
	font-weight: bold;
`

const Score = styled.Text`
	font-size: 48px;
	color: #fff;
	font-weight: bold;
	margin: 5px 0;
`

const WordContainer = styled(Animated.View)`
	flex: 1;
	justify-content: center;
	align-items: center;
	width: 90%;
	height: 40%;
	border-radius: 10px;
	padding: 20px;
	margin-top: 60px;
	margin-bottom: 60px;
`

const BottomBar = styled.View`
	position: absolute;
	bottom: 0;
	width: 100%;
	background-color: #000;
	padding-top: 10px;
	padding-bottom: 20px;
	justify-content: center;
	align-items: center;
`

const BottomBarText = styled.Text`
	font-size: 18px;
	color: #fff;
	font-weight: bold;
`

const ScoreBottom = styled.Text`
	font-size: 48px;
	color: #fff;
	font-weight: bold;
	margin: 5px 0;
`

const Timer = styled.Text`
	font-size: 24px;
	color: #00ffd2;
	margin-top: 5px;
	font-weight: bold;
`

const StopButton = styled(TouchableOpacity)`
	background-color: #000;
	padding: 10px 30px;
	border-radius: 25px;
	position: absolute;
	left: 10px;
	bottom: 20px;
	border-width: 2px;
	border-color: #00ffd2;
`

const StopButtonText = styled.Text`
	font-size: 18px;
	color: #00ffd2;
	font-weight: bold;
`

const StartButton = styled(TouchableOpacity)`
	background-color: #00ffd2;
	padding: 20px 40px;
	border-radius: 25px;
`

const StartButtonText = styled.Text`
	font-size: 24px;
	color: #000;
	font-weight: bold;
`
