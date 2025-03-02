// screens/GameScreen/GameScreen.js

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { TouchableOpacity, PanResponder, BackHandler, View } from 'react-native'
import Animated, {
	useSharedValue,
	withTiming,
	runOnJS,
} from 'react-native-reanimated'
import styled from 'styled-components/native'

import useTeamStore from '../../store/TeamStore'
import useSettingsStore from '../../store/SettingsStore'
import useScoreStore from '../../store/useScoreStore'

import { data } from '../../data/words'
import getWordsForGame from '../../utils/getWordsForGame'
import playSound from '../../utils/playSound'

import swipeUpSound from '../../../assets/swipe-up.mp3'
import swipeDownSound from '../../../assets/swipe-down.mp3'
import timerEndSound from '../../../assets/timer-end.mp3'

import SelectTeamModal from '../../components/ui/SelectTeamModal'
import { CircleBg } from '../../components/CircleBg'
import { BottomBar, TopBar } from '../../components/GameUI'
import { SafeAreaView } from 'react-native'
import SafeAreaWrapper from '../../HOC/SafeAreaWrapper'

const GameScreen = ({ navigation }) => {
	const { selectedTeams } = useTeamStore()
	const { roundTime, difficultyLevel } = useSettingsStore()
	const {
		currentTeamIndex,
		wordsArray: globalWordsArray,
		setWordsArray,
	} = useScoreStore()
	const currentTeam = selectedTeams[currentTeamIndex]

	// Локальные состояния экрана
	const [fontSize, setFontSize] = useState(32)
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

	// Реализуем анимацию свайпа
	const translateY = useSharedValue(0)
	// Инициализация списка слов (можно перенести в startGame, если требуется генерировать слова один раз)
	useEffect(() => {
		const initialWords = getWordsForGame(
			data,
			roundTime,
			difficultyLevel,
			globalWordsArray.map(item => item.word)
		)
		console.log('asdfasdf', initialWords)
		setWords(initialWords)
	}, [difficultyLevel, roundTime, globalWordsArray])

	// Блокируем кнопку "Назад" на Android
	useEffect(() => {
		const backAction = () => true
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction
		)
		return () => backHandler.remove()
	}, [])

	// Таймер игры (каждую секунду уменьшаем timer, когда игра запущена и не на паузе)
	useEffect(() => {
		if (isGameStarted && !isGamePaused && timer > 0) {
			const interval = setInterval(() => {
				setTimer(prev => {
					if (prev === 1) {
						clearInterval(interval)
						setTimerEnded(true)
						// setIsGameStarted(false)
						playSound(timerEndSound, 0.5)
						return 0
					}
					return prev - 1
				})
			}, 1000)
			return () => clearInterval(interval)
		}
	}, [isGameStarted, isGamePaused, timer])

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

	const adjustFontSize = useCallback(event => {
		const { width } = event.nativeEvent.layout
		if (width > 270) {
			setFontSize(prev => Math.max(prev - 2, 12))
		}
	}, [])

	const startGame = () => {
		console.log('ad')
		setIsGameStarted(true)
		setIsGamePaused(false)
		setTimer(roundTime)
		setTimerEnded(false)
		setGuessedWords(0)
		setSkippedWords(0)
		setLocalWordsArray([])
		showNextWord()
	}

	// Обработка статуса слова (отгадано/пропущено)
	const handleWordStatus = useCallback(
		status => {
			// Формируем новый массив для локального хранения слов раунда
			const updatedWordsArray = [
				...localWordsArray,
				{ word: currentWord, status },
			]
			console.log(updatedWordsArray)
			setLocalWordsArray(updatedWordsArray)
			// Добавляем текущее слово в глобальное хранилище (функция в zustand выполняет append)
			setWordsArray([{ word: currentWord, status }])

			// Обновляем счёт раунда
			if (status === true && !timerEnded) {
				setGuessedWords(prev => prev + 1)
			} else if (status === false && !timerEnded) {
				setSkippedWords(prev => prev + 1)
			}

			if (timerEnded) {
				if (status === true) {
					setShowModal(true)
					setIsGameStarted(false)
				} else {
					navigation.navigate('RoundResultsScreen', {
						wordsArray: updatedWordsArray,
					})
				}
				return
			}

			showNextWord()
		},
		[
			currentWord,
			localWordsArray,
			timerEnded,
			navigation,
			showNextWord,
			setWordsArray,
		]
	)

	const handleTeamSelect = useCallback(
		teamName => {
			setShowModal(false)
			useScoreStore.getState().updateScore(teamName, 1)
			navigation.navigate('RoundResultsScreen', {
				wordsArray: localWordsArray,
			})
		},
		[navigation, localWordsArray]
	)

	// Завершение свайпа вверх: отгадано слово
	const finishSwipeUp = useCallback(() => {
		handleWordStatus(true)
		translateY.value = 0
	}, [handleWordStatus, translateY])

	// Завершение свайпа вниз: слово пропущено
	const finishSwipeDown = useCallback(() => {
		handleWordStatus(false)
		translateY.value = 0
	}, [handleWordStatus, translateY])

	// Обработчик свайпа вверх
	const handleSwipeUp = useCallback(() => {
		if (!isGameStarted || isGamePaused) return
		translateY.value = withTiming(-800, { duration: 300 }, finished => {
			if (finished) {
				runOnJS(finishSwipeUp)()
			}
		})
		playSound(swipeUpSound, 0.5)
	}, [isGameStarted, timerEnded, isGamePaused, translateY, finishSwipeUp])

	// Обработчик свайпа вниз
	const handleSwipeDown = useCallback(() => {
		if (!isGameStarted || isGamePaused) return
		translateY.value = withTiming(800, { duration: 300 }, finished => {
			if (finished) {
				runOnJS(finishSwipeDown)()
			}
		})
		playSound(swipeDownSound, 0.5)
	}, [isGameStarted, timerEnded, isGamePaused, translateY, finishSwipeDown])

	// Пан-резонер для обработки жестов свайпа
	const panResponder = useMemo(
		() =>
			PanResponder.create({
				onMoveShouldSetPanResponder: () => true,
				onPanResponderRelease: (evt, gestureState) => {
					// console.log(isGameStarted, isGamePaused)
					if (!isGameStarted || isGamePaused) return
					if (gestureState.dy < -50) {
						handleSwipeUp()
					} else if (gestureState.dy > 50) {
						handleSwipeDown()
					}
				},
			}),
		[
			isGameStarted,
			timerEnded,
			isGamePaused,
			handleSwipeUp,
			handleSwipeDown,
		]
	)

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Container>
				<TopBar currentTeam={currentTeam} guessedWords={guessedWords} />

				<WordContainer {...panResponder.panHandlers}>
					{isGameStarted || timerEnded ? (
						isGamePaused ? (
							<StartButton onPress={() => setIsGamePaused(false)}>
								<StartButtonText>Продолжить</StartButtonText>
							</StartButton>
						) : (
							<CircleBg
								translateY={translateY}
								currentWord={currentWord}
								fontSize={fontSize}
								adjustFontSize={adjustFontSize}
							/>
						)
					) : (
						<StartButton onPressIn={startGame}>
							<StartButtonText>Начало</StartButtonText>
						</StartButton>
					)}
				</WordContainer>

				<BottomBar
					skippedWords={skippedWords}
					timer={timer}
					timerEnded={timerEnded}
				/>

				{isGameStarted && !timerEnded && !isGamePaused && (
					<StopButton onPress={() => setIsGamePaused(true)}>
						<StopButtonText>СТОП</StopButtonText>
					</StopButton>
				)}

				<View style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
					<SelectTeamModal
						visible={showModal}
						selectedTeams={selectedTeams}
						handleTeamSelect={handleTeamSelect}
					/>
				</View>
			</Container>
		</SafeAreaView>
	)
}

export default SafeAreaWrapper(React.memo(GameScreen), {
	statusBarStyle: 'light-content',
	statusBarHidden: false,
	backgroundCoslor: '#080808',
})

const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: #1f1f1f;
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

const StartButton = styled.TouchableOpacity`
	position: relative;
	z-index: 9999999;
	background-color: #00ffd2;
	padding: 20px 40px;
	border-radius: 25px;
`

const StartButtonText = styled.Text`
	font-size: 24px;
	color: #000;
	font-weight: bold;
`
