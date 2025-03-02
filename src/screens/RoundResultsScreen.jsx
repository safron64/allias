import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, BackHandler } from 'react-native'
import styled from 'styled-components/native'
import ThumbsUpIcon from '../../assets/ThumbsUpIcon'
import ThumbsDownIcon from '../../assets/ThumbsDownIcon'
import useScoreStore from '../store/useScoreStore'
import useTeamStore from '../store/TeamStore'
import useSettingsStore from '../store/SettingsStore'
import SelectTeamModal from '../components/ui/SelectTeamModal'
import SafeAreaWrapper from '../HOC/SafeAreaWrapper'
import { Linking } from 'react-native'

const RoundResultsScreen = ({ route, navigation }) => {
	// Берём количество слов (например, порог победы) из настроек
	const { wordCount } = useSettingsStore()
	const winningScore = wordCount

	// Из параметров экрана получаем массив слов раунда
	const { wordsArray } = route.params

	// Локальное состояние для слов с их статусом и (для последнего слова) выбранной командой
	const [wordStatusArray, setWordStatusArray] = useState(
		wordsArray.map(word => ({
			word: word.word,
			status: word.status,
			team: undefined,
		}))
	)

	// Блокируем кнопку "Назад" на Android
	useEffect(() => {
		const backAction = () => true
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction
		)
		return () => backHandler.remove()
	}, [])

	// Достаем необходимые функции и состояния из глобального стора
	const {
		currentTeamIndex,
		updateScore,
		nextTeam,
		extraRound,
		setExtraRound,
		scores,
	} = useScoreStore()
	const { selectedTeams } = useTeamStore()
	const currentTeam = selectedTeams[currentTeamIndex]

	// Состояние для управления видимостью модального окна выбора команды для последнего слова
	const [isModalVisible, setModalVisible] = useState(false)

	// Локальный счёт раунда, вычисляемый на основании массива слов
	const [score, setScore] = useState(() =>
		wordStatusArray.reduce(
			(total, word) =>
				total +
				(word.status === true ? 1 : word.status !== undefined && -0),
			0
		)
	)

	// Функция для открытия модального окна
	const openModal = () => {
		setModalVisible(true)
	}

	// Обработчик выбора команды в модальном окне (для последнего слова)
	const handleTeamSelect = team => {
		setWordStatusArray(prevArray => {
			const updatedArray = [...prevArray]
			const lastWordIndex = updatedArray.length - 1
			updatedArray[lastWordIndex].team = team
			if (team === currentTeam) {
				setScore(prevScore => prevScore + 1)
			} else {
				updateScore(team, 1)
			}
			return updatedArray
		})
		setModalVisible(false)
	}

	// Функция для переключения статуса слова (при нажатии на иконку)
	const toggleWordStatus = index => {
		const isLastWord = index === wordStatusArray.length - 1
		if (isLastWord) {
			setWordStatusArray(prevArray => {
				const updatedArray = [...prevArray]
				const currentStatus = updatedArray[index].status
				// Если для последнего слова уже выбрана команда – отменяем выбор
				if (updatedArray[index].team === currentTeam) {
					updatedArray[index].team = undefined
					setScore(prevScore => prevScore - 0)
				} else if (updatedArray[index].team) {
					// Если выбрана другая команда, то корректируем общий счёт этой команды
					updateScore(updatedArray[index].team, -0)
					updatedArray[index].team = undefined
				}
				// Переключаем статус слова
				updatedArray[index].status = !currentStatus
				return updatedArray
			})
			// Если слово переключается в состояние "отгадано", открываем модальное окно для выбора команды
			if (!wordStatusArray[index].status) {
				openModal()
			}
		} else {
			setWordStatusArray(prevArray => {
				const updatedArray = [...prevArray]
				const currentStatus = updatedArray[index].status
				updatedArray[index].status = !currentStatus
				return updatedArray
			})
			// При переключении не последнего слова корректируем счёт (например, +2 или -2)
			setScore(prevScore => {
				// Здесь логика расчёта может быть изменена под ваши нужды
				return wordStatusArray[index].status
					? prevScore + 1
					: prevScore - 1
			})
		}
	}

	// Рендер одного элемента списка слов
	const renderWordItem = ({ item, index }) => (
		<WContainer>
			<WordContainer>
				<WordText
					style={{ textDecorationLine: 'underline' }}
					onPress={() =>
						Linking.openURL(
							`https://www.pr2711.com/ru/библиотека/книги/Понимание-Писания/${item.word.replace(
								/\s+/g,
								'-'
							)}/`
						)
					}
				>
					{index === wordStatusArray.length - 1 && item.team
						? `${item.word} (${item.team})`
						: `${item.word}`}
				</WordText>
				<View style={{ flexDirection: 'row' }}>
					<IconButton onPress={() => toggleWordStatus(index)}>
						{item.status ? <ThumbsUpIcon /> : <ThumbsDownIcon />}
					</IconButton>
				</View>
			</WordContainer>
		</WContainer>
	)

	// Обработчик нажатия на кнопку "Продолжить"
	const handleContinue = () => {
		// Обновляем счёт для текущей команды
		updateScore(currentTeam, score)

		// Вычисляем новый cumulative (общий) счёт с учётом набранных очков в этом раунде
		const newScore = {
			...scores,
			[currentTeam]: (scores[currentTeam] || 0) + score,
		}

		// Если уже сыгран дополнительный раунд, сравниваем очки и определяем победителя
		if (extraRound) {
			if (newScore[selectedTeams[1]] > newScore[selectedTeams[0]]) {
				navigation.navigate('VictoryScreen', {
					winningTeam: selectedTeams[1],
					scores: newScore,
				})
			} else {
				navigation.navigate('VictoryScreen', {
					winningTeam: selectedTeams[0],
					scores: newScore,
				})
			}
			// Сбрасываем флаг дополнительного раунда для новой игры
			setExtraRound(false)
			return
		}

		// Если текущая команда достигла или превысила порог winningScore…
		if (newScore[currentTeam] >= winningScore) {
			// Если побеждает команда, которая не начинала игру (не первая), сразу показываем экран победы
			if (currentTeam !== selectedTeams[0]) {
				navigation.navigate('VictoryScreen', {
					winningTeam: currentTeam,
					scores: newScore,
				})
				return
			} else {
				// Если первая команда достигла winningScore, даём ей дополнительный раунд –
				// переключаем очередь на вторую команду и передаём параметр extraRound
				setExtraRound(true)
				nextTeam(selectedTeams) // переключаем текущую команду
				navigation.navigate('StartGame', { extraRound: true })
				return
			}
		}

		// Если ни одна команда не достигла winningScore, переключаемся на следующий раунд
		nextTeam(selectedTeams)
		navigation.navigate('StartGame')
	}

	return (
		<Container>
			<ScoreContainer>
				<ScoreText>Набрано очков: {score}</ScoreText>
			</ScoreContainer>
			<FlatList
				data={wordStatusArray}
				keyExtractor={(item, index) => index.toString()}
				renderItem={renderWordItem}
				style={{ marginTop: 30 }}
			/>
			<ContinueButton onPress={handleContinue}>
				<ContinueButtonText>Продолжить</ContinueButtonText>
			</ContinueButton>
			<SelectTeamModal
				visible={isModalVisible}
				selectedTeams={selectedTeams}
				handleTeamSelect={handleTeamSelect}
			/>
		</Container>
	)
}

export default SafeAreaWrapper(React.memo(RoundResultsScreen), {
	statusBarStyle: 'light-content',
	statusBarHidden: false,
	backgroundColor: '#080808',
})

// Стили
const WContainer = styled.View`
	justify-content: space-between;
	align-items: center;
	padding-bottom: 5px;
	height: auto;
`

const Container = styled.View`
	flex: 1;
	justify-content: flex-start;
	align-items: center;
	background-color: #121212;
	padding: 10px;
`

const ScoreContainer = styled.View`
	background-color: #00ffb2;
	width: 100%;
	padding: 15px;
	align-items: center;
	border-radius: 10px;
	margin-top: 30px;
`

const ScoreText = styled.Text`
	font-size: 24px;
	color: #121212;
	font-weight: bold;
`

const WordContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	margin: 10px auto;
	background-color: #1f1f1f;
	border-radius: 10px;
	width: 90%;
`

const WordText = styled.Text`
	font-size: 18px;
	color: #ffffff;
`

const IconButton = styled.TouchableOpacity`
	padding: 5px;
`

const ContinueButton = styled.TouchableOpacity`
	background-color: #00ffb2;
	padding: 15px 30px;
	border-radius: 30px;
	margin-bottom: 10px;
	margin-top: 10px;
`

const ContinueButtonText = styled.Text`
	color: #121212;
	font-size: 18px;
	font-weight: bold;
`
