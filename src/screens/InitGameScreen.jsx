import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { teams } from '../data/teams'
import { getRandomTeams } from '../utils/getRandomTeams'
import { TeamsContainer, StartGameContainer } from '../styles/containers'
import Title from '../styles/Title'
import TeamNameComponent from '../components/TeamName'
import AddButton from '../components/ui/AddButton'
import StartGameButton from '../components/ui/StartGameButton'

const InitGameSrcreen = () => {
	const navigation = useNavigation() // Используем хук useNavigation
	const [selectedTeams, setSelectedTeams] = useState(getInitialTeams())

	function getInitialTeams() {
		return getRandomTeams(teams, 2)
	}

	const addTeam = () => {
		if (selectedTeams.length < 4) {
			const availableTeams = teams.filter(
				team => !selectedTeams.includes(team)
			)
			const newTeam = getRandomTeams(availableTeams, 1)[0]
			setSelectedTeams([...selectedTeams, newTeam])
		}
	}

	const removeTeam = team => {
		if (selectedTeams.length > 2) {
			setSelectedTeams(selectedTeams.filter(t => t !== team))
		}
	}

	return (
		<SafeAreaView style={{ backgroundColor: '#161616', flex: 1 }}>
			<Title>Выберите команды:</Title>
			<TeamsContainer>
				{selectedTeams.map((team, index) => (
					<TeamNameComponent
						key={index}
						team={team}
						onRemove={() => removeTeam(team)}
						canRemove={selectedTeams.length > 2}
					/>
				))}
				{selectedTeams.length < 4 && (
					<AddButton onPress={addTeam}>+ Добавить команду</AddButton>
				)}
			</TeamsContainer>
			<StartGameContainer>
				<StartGameButton
					onPress={() => navigation.navigate('GameSettings')}
				>
					Начать игру
				</StartGameButton>
			</StartGameContainer>
		</SafeAreaView>
	)
}

export default InitGameSrcreen
