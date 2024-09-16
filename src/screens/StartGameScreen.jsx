import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import CrownIcon from '../../assets/CrownIcon'
import useTeamStore from '../store/TeamStore'
import useSettingsStore from '../store/SettingsStore'

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

const StartGameScreen = () => {
	const { selectedTeams } = useTeamStore()
	const {
		wordCount,
		roundTime,
		penaltyEnabled,
		commonLastWord,
		soundEnabled,
		setWordCount,
		setRoundTime,
		setPenaltyEnabled,
		setCommonLastWord,
		setSoundEnabled,
	} = useSettingsStore()

	return (
		<Container>
			<Header>
				<TeamRow>
					<Title>
						РЕЙТИНГ <br />
						КОМАНД
					</Title>
					<Column>
						<CrownIcon />
						<ScoreText>{wordCount}</ScoreText>
					</Column>
				</TeamRow>
				<TeamRow>
					<TeamText>{selectedTeams[0]}</TeamText>
					<ScoreText>{0}</ScoreText>
				</TeamRow>
				<TeamRow>
					<TeamText>{selectedTeams[1]}</TeamText>
					<ScoreText>0</ScoreText>
				</TeamRow>
			</Header>

			{/* Round Information */}
			<RoundInfo>
				<RoundText>Раунд 1 \\ Игра 1</RoundText>
				<RoundText>готовятся к игре</RoundText>
				<ActiveTeamText>{selectedTeams[0]}</ActiveTeamText>
			</RoundInfo>

			{/* Start Button */}
			<StartButton>
				<StartButtonText>Поехали!</StartButtonText>
			</StartButton>
		</Container>
	)
}

export default StartGameScreen
