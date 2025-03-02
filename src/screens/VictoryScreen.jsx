import React, { useEffect } from 'react'
import { BackHandler } from 'react-native'
import styled from 'styled-components/native'
import useScoreStore from '../store/useScoreStore'
import useTeamStore from '../store/TeamStore'
import SafeAreaWrapper from '../HOC/SafeAreaWrapper'

const VictoryScreen = ({ route, navigation }) => {
	// Принимаем из параметров экрана имя победившей команды и общий счёт
	const { winningTeam, scores } = route.params
	const { selectedTeams } = useTeamStore()
	const { setTeams } = useScoreStore() // Для сброса счёта при новой игре

	// Блокируем кнопку "Назад"
	useEffect(() => {
		const backAction = () => true
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction
		)
		return () => backHandler.remove()
	}, [])

	// Обработчик для начала новой игры
	const handleNewGame = () => {
		// Сбросим счёт, установив команды заново (функция setTeams может принимать массив выбранных команд)
		setTeams(selectedTeams)
		navigation.navigate('GameSettings')
	}

	return (
		<Container>
			<VictoryText>Победила команда:</VictoryText>
			<WinningTeamText>{winningTeam}</WinningTeamText>
			<ScoresContainer>
				{Object.entries(scores).map(([team, score]) => (
					<ScoreItem key={team}>
						<TeamName>{team}: </TeamName>
						<TeamScore>{score}</TeamScore>
					</ScoreItem>
				))}
			</ScoresContainer>
			<NewGameButton onPress={handleNewGame}>
				<NewGameButtonText>Новая игра</NewGameButtonText>
			</NewGameButton>
		</Container>
	)
}

export default SafeAreaWrapper(React.memo(VictoryScreen), {
	statusBarStyle: 'light-content',
	statusBarHidden: false,
	backgroundColor: '#080808',
})

// Стили
const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: #121212;
	padding: 20px;
`

const VictoryText = styled.Text`
	font-size: 28px;
	color: #00ffb2;
	margin-bottom: 10px;
`

const WinningTeamText = styled.Text`
	font-size: 32px;
	color: #ffffff;
	font-weight: bold;
	margin-bottom: 30px;
`

const ScoresContainer = styled.View`
	width: 100%;
	margin-bottom: 30px;
`

const ScoreItem = styled.View`
	flex-direction: row;
	justify-content: space-between;
	padding: 10px;
	background-color: #1f1f1f;
	border-radius: 10px;
	margin-bottom: 10px;
`

const TeamName = styled.Text`
	font-size: 18px;
	color: #ffffff;
`

const TeamScore = styled.Text`
	font-size: 18px;
	color: #00ffb2;
	font-weight: bold;
`

const NewGameButton = styled.TouchableOpacity`
	background-color: #00ffb2;
	padding: 15px 30px;
	border-radius: 30px;
`

const NewGameButtonText = styled.Text`
	color: #121212;
	font-size: 18px;
	font-weight: bold;
`
