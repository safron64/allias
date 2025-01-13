// import React, { useState, useEffect } from 'react'
// import {
// 	View,
// 	Text,
// 	FlatList,
// 	TouchableOpacity,
// 	BackHandler,
// } from 'react-native'
// import styled from 'styled-components/native'
// import ThumbsUpIcon from '../../assets/ThumbsUpIcon'
// import ThumbsDownIcon from '../../assets/ThumbsDownIcon'
// import useScoreStore from '../store/useScoreStore'
// import useTeamStore from '../store/TeamStore'
// import SelectTeamModal from '../components/ui/SelectTeamModal'

// const RoundResultsScreen = ({ route, navigation }) => {
// 	const { wordsArray } = route.params

// 	const [wordStatusArray, setWordStatusArray] = useState(
// 		wordsArray.map(word => ({
// 			word: word.word,
// 			status: word.status,
// 		}))
// 	)

// 	const [score, setScore] = useState(() =>
// 		wordStatusArray.reduce(
// 			(total, word) =>
// 				total +
// 				(word.status === true ? 1 : word.status !== undefined ? -1 : 0),
// 			0
// 		)
// 	)

// 	const { currentTeamIndex, updateScore, nextTeam } = useScoreStore()
// 	const { selectedTeams } = useTeamStore()
// 	const currentTeam = selectedTeams[currentTeamIndex]

// 	const [isModalVisible, setModalVisible] = useState(false)

// 	useEffect(() => {
// 		const backAction = () => {
// 			// Disable back button on this screen
// 			return true
// 		}

// 		const backHandler = BackHandler.addEventListener(
// 			'hardwareBackPress',
// 			backAction
// 		)

// 		return () => backHandler.remove()
// 	}, [])

// 	const handleContinue = () => {
// 		updateScore(currentTeam, score)
// 		nextTeam(selectedTeams)
// 		navigation.navigate('StartGame')
// 	}

// 	const handleTeamSelect = team => {
// 		setWordStatusArray(prevArray => {
// 			const updatedArray = [...prevArray]
// 			const lastWordIndex = updatedArray.length - 1
// 			updatedArray[lastWordIndex].team = team
// 			if (team === currentTeam) {
// 				setScore(prevScore => prevScore + 1)
// 			} else {
// 				updateScore(team, 1)
// 			}
// 			return updatedArray
// 		})
// 		setModalVisible(false)
// 	}

// 	const renderWordItem = ({ item, index }) => {
// 		const isLastWord = index === wordStatusArray.length - 1

// 		const toggleWordStatus = () => {
// 			setWordStatusArray(prevArray => {
// 				const updatedArray = [...prevArray]
// 				updatedArray[index].status = !updatedArray[index].status
// 				return updatedArray
// 			})
// 			setScore(prevScore => prevScore + (item.status ? -1 : 1))
// 			if (isLastWord) {
// 				setModalVisible(true)
// 			}
// 		}

// 		return (
// 			<WordContainer>
// 				<WordText>
// 					{isLastWord && item.team
// 						? `${item.word} (${item.team})`
// 						: item.word}
// 				</WordText>
// 				<View style={{ flexDirection: 'row' }}>
// 					<IconButton onPress={toggleWordStatus}>
// 						{item.status ? <ThumbsUpIcon /> : <ThumbsDownIcon />}
// 					</IconButton>
// 				</View>
// 			</WordContainer>
// 		)
// 	}

// 	return (
// 		<Container>
// 			<ScoreContainer>
// 				<ScoreText>Набрано очков: {score}</ScoreText>
// 			</ScoreContainer>
// 			<FlatList
// 				data={wordStatusArray}
// 				keyExtractor={(item, index) => index.toString()}
// 				renderItem={renderWordItem}
// 				contentContainerStyle={{
// 					paddingBottom: 20,
// 				}}
// 				style={{ marginTop: 30, width: '100%' }}
// 			/>
// 			<SelectTeamModal
// 				visible={isModalVisible}
// 				selectedTeams={selectedTeams}
// 				handleTeamSelect={handleTeamSelect}
// 			/>
// 			<ContinueButton onPress={handleContinue}>
// 				<ContinueButtonText>Продолжить</ContinueButtonText>
// 			</ContinueButton>
// 		</Container>
// 	)
// }

// export default RoundResultsScreen

// // Стили





import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, Modal } from 'react-native'
import styled from 'styled-components/native'
import ThumbsUpIcon from '../../assets/ThumbsUpIcon'
import ThumbsDownIcon from '../../assets/ThumbsDownIcon'
import useScoreStore from '../store/useScoreStore'
import useTeamStore from '../store/TeamStore'
import SelectTeamModal from '../components/ui/SelectTeamModal'
import { BackHandler } from 'react-native'
const WContainer = styled.View`
	justify-content: space-between;
	align-items: center;
	/* background-color: #f5f5f5; */
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
	margin-top: 10px
`

const ContinueButtonText = styled.Text`
	color: #121212;
	font-size: 18px;
	font-weight: bold;
`
const RoundResultsScreen = ({ route, navigation }) => {
	const { wordsArray } = route.params

	const [wordStatusArray, setWordStatusArray] = useState(
		wordsArray.map(word => ({
			word: word.word,
			status: word.status,
		}))
	)

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

	const { currentTeamIndex, updateScore, nextTeam } = useScoreStore()
	const { selectedTeams } = useTeamStore()
	const currentTeam = selectedTeams[currentTeamIndex]
	const [isModalVisible, setModalVisible] = useState(false)

	const handleContinue = () => {
		updateScore(currentTeam, score)
		nextTeam(selectedTeams)
		navigation.navigate('StartGame')
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
			<WContainer>
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
							{item.status ? (
								<ThumbsUpIcon />
							) : (
								<ThumbsDownIcon />
							)}
						</IconButton>
					</View>
				</WordContainer>
			</WContainer>
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
				style={{ marginTop: 30 }}
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
