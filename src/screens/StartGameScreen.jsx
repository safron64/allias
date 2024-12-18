import React, { useMemo, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import CrownIcon from '../../assets/CrownIcon'
import useTeamStore from '../store/TeamStore'
import useSettingsStore from '../store/SettingsStore'
import useScoreStore from '../store/useScoreStore'
import { BackHandler } from 'react-native';

const Container = styled.View`
	flex: 1;
	background-color: #282828;
	justify-content: space-between;
`

const Header = styled.View`
	background-color: #00ffeab5;
	padding: 10px 30px;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
`

const TeamRow = styled.View`
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 10px;
	align-items: center;
`

const TeamText = styled.Text`
	color: white;
	font-size: 18px;
`

const ScoreText = styled.Text`
	color: white;
	font-size: 18px;
	font-weight: 500;
`

const RoundInfo = styled.View`
	justify-content: center;
	align-items: center;
	margin-top: 20px;
`

const RoundText = styled.Text`
	color: white;
	font-size: 16px;
`

const ActiveTeamText = styled.Text`
	color: #00ffea;
	font-size: 22px;
	font-weight: bold;
`

const StartButton = styled(TouchableOpacity)`
	background-color: #000;
	padding: 20px;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	margin: 20px;
`

const StartButtonText = styled.Text`
	color: white;
	font-size: 18px;
	font-weight: bold;
`

const Title = styled.Text`
	color: #2a7368;
	font-size: 25px;
	font-weight: bold;
	margin-bottom: 10px;
`

const Column = styled.View`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-right: -10px;
`

const StartGameScreen = ({ navigation }) => {
	const { selectedTeams } = useTeamStore()
	const { scores, currentTeamIndex, nextTeam } = useScoreStore()
	const { wordCount } = useSettingsStore()

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

	// Мемоизация текущей команды
	const currentTeam = useMemo(
		() => selectedTeams[currentTeamIndex],
		[selectedTeams, currentTeamIndex]
	)

	return (
		<Container>
			<Header>
				<TeamRow>
					<Title>
						РЕЙТИНГ {'\n'}
						КОМАНД
					</Title>
					<Column>
						<CrownIcon />
						<TeamText>{wordCount}</TeamText>
					</Column>
				</TeamRow>
				{selectedTeams.map((team, index) => (
					<TeamRow key={index}>
						<TeamText>{team}</TeamText>
						<ScoreText>{scores[team] || 0}</ScoreText>
					</TeamRow>
				))}
			</Header>

			<RoundInfo>
				<RoundText>Раунд 1 / Игра 1</RoundText>
				<RoundText>Готовятся к игре</RoundText>
				{selectedTeams.length > 0 && (
					<ActiveTeamText>{currentTeam}</ActiveTeamText>
				)}
			</RoundInfo>

			<StartButton onPress={() => navigation.navigate('GameScreen')}>
				<StartButtonText>Поехали!</StartButtonText>
			</StartButton>
		</Container>
	)
}

export default React.memo(StartGameScreen)
