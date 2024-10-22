import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Modal } from 'react-native'
import styled from 'styled-components/native'
import ThumbsUpIcon from '../../assets/ThumbsUpIcon'
import ThumbsDownIcon from '../../assets/ThumbsDownIcon'
import useScoreStore from '../store/useScoreStore'
import useTeamStore from '../store/TeamStore'
import SelectTeamModal from '../components/ui/selectTeamModal'

const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: #f5f5f5;
	padding-bottom: 20px;
`

const ScoreContainer = styled.View`
	background-color: #ff9500;
	width: 100%;
	padding: 10px;
	align-items: center;
`

const ScoreText = styled.Text`
	font-size: 24px;
	color: white;
	font-weight: bold;
`

const WordContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	margin: 5px;
	background-color: white;
	border-radius: 5px;
	width: 90%;
`

const WordText = styled.Text`
	font-size: 18px;
`

const IconButton = styled.TouchableOpacity`
	padding: 5px;
`

const ContinueButton = styled.TouchableOpacity`
	background-color: #008cff;
	padding: 10px 30px;
	border-radius: 25px;
	margin-top: 20px;
`

const ContinueButtonText = styled.Text`
	color: white;
	font-size: 18px;
	font-weight: bold;
`

const RoundResultsScreen = ({ route, navigation }) => {
	const { wordsArray } = route.params

	// Начальное состояние для слов с их статусами
	const [wordStatusArray, setWordStatusArray] = useState(
		wordsArray.map(word => ({
			word: word.word,
			status: word.status,
		}))
	)

	console.log(wordStatusArray)

	const { currentTeamIndex, updateScore, nextTeam } = useScoreStore()
	const { selectedTeams } = useTeamStore() // Доступ к store
	const currentTeam = selectedTeams[currentTeamIndex]
	const [isModalVisible, setModalVisible] = useState(false)

	const handleContinue = () => {
		updateScore(currentTeam, score) // Обновляем счет команды
		nextTeam(selectedTeams) // Переходим к следующей команде
		navigation.navigate('StartGame') // Возвращаемся на экран начала игры
	}

	// Локальное состояние для общего счета
	const [score, setScore] = useState(() => {
		return wordStatusArray.reduce(
			(total, word) =>
				total +
				(word.status === true ? 1 : word.status !== undefined && -1),
			0
		)
	})

	// Открыть модальное окно при нажатии на "Общее" для последнего слова
	const openModal = () => {
		setModalVisible(true)
	}

	// Закрыть модальное окно и обновить команду для последнего слова
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

	const renderWordItem = ({ item, index }) => {
		// Проверяем, является ли это последнее слово и его статус равен false
		const isLastWord = index === wordStatusArray.length - 1
		const toggleWordStatus = index => {
			if (isLastWord) {
				setWordStatusArray(prevArray => {
					const updatedArray = [...prevArray]
					const currentStatus = updatedArray[index].status
					const lastWordIndex = updatedArray.length - 1
					if (updatedArray[lastWordIndex].team === currentTeam) {
						updatedArray[lastWordIndex].team = undefined
						setScore(prevScore => prevScore - 1)
					} else if (updatedArray[lastWordIndex].team) {
						updateScore(updatedArray[lastWordIndex].team, -1)
						updatedArray[lastWordIndex].team = undefined
					}
					updatedArray[index].status = !currentStatus
					console.log(updatedArray)
					return updatedArray
				})
				{
					wordStatusArray[index].status && openModal()
				}
			} else {
				setWordStatusArray(prevArray => {
					const updatedArray = [...prevArray]
					const currentStatus = updatedArray[index].status
					updatedArray[index].status = !currentStatus
					return updatedArray
				})

				// Пересчитываем очки
				setScore(prevScore => {
					const currentStatus = wordStatusArray[index].status
					console.log(currentStatus)
					return currentStatus ? prevScore + 2 : prevScore - 2
				})
			}
		}

		return (
			<WordContainer>
				{/* Если это последнее слово и оно не отгадано, то отображаем "Общее" или команду */}
				<WordText>
					{isLastWord && item.team
						? `${item.word} (${item.team})`
						: `${item.word}`}
				</WordText>
				<View style={{ flexDirection: 'row' }}>
					{/* При нажатии на кнопку иконка меняется только для конкретного элемента */}
					<IconButton onPress={() => toggleWordStatus(index)}>
						{item.status ? <ThumbsUpIcon /> : <ThumbsDownIcon />}
					</IconButton>
				</View>
			</WordContainer>
		)
	}

	return (
		<Container>
			{/* Счетчик очков */}
			<ScoreContainer>
				<ScoreText>Набрано очков: {score}</ScoreText>
			</ScoreContainer>

			{/* Список слов */}
			<FlatList
				data={wordStatusArray}
				keyExtractor={(item, index) => index.toString()}
				renderItem={renderWordItem}
			/>

			{/* Кнопка продолжить */}
			<ContinueButton onPress={handleContinue}>
				<ContinueButtonText>Продолжить</ContinueButtonText>
			</ContinueButton>

			{/* Модальное окно для выбора команды */}
			<SelectTeamModal
				visible={isModalVisible}
				selectedTeams={selectedTeams}
				handleTeamSelect={handleTeamSelect}
			/>
		</Container>
	)
}

export default RoundResultsScreen
