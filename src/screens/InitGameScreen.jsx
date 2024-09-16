import React from 'react'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useTeamStore from '../store/TeamStore'
import { TeamsContainer, StartGameContainer } from '../styles/containers'
import Title from '../styles/Title'
import TeamNameComponent from '../components/TeamName'
import AddButton from '../components/ui/AddButton'
import StartGameButton from '../components/ui/StartGameButton'

const InitGameScreen = () => {
	const navigation = useNavigation()
	const { selectedTeams, addTeam, removeTeam } = useTeamStore()

	return (
		<SafeAreaView style={{ backgroundColor: '#282828', flex: 1 }}>
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

export default InitGameScreen
