import { Modal, Text, View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

const ModalContainer = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
`

const ModalContent = styled.View`
	background-color: white;
	padding: 20px;
	border-radius: 10px;
	align-items: center;
`

const ModalText = styled.Text`
	font-size: 18px;
	margin-bottom: 10px;
`

const TeamButton = styled.TouchableOpacity`
	background-color: #4caf50;
	padding: 10px 20px;
	margin: 5px;
	border-radius: 5px;
`

const TeamButtonText = styled.Text`
	color: white;
	font-size: 16px;
	font-weight: bold;
`

const SelectTeamModal = ({ visible, selectedTeams, handleTeamSelect }) => {
	return (
		<Modal visible={visible} transparent={true} animationType="slide">
			<ModalContainer>
				<ModalContent>
					<ModalText>Какой команде засчитать слово?</ModalText>
					{selectedTeams.map((team, index) => (
						<TeamButton
							key={index}
							onPress={() => handleTeamSelect(team)}
						>
							<TeamButtonText>{team}</TeamButtonText>
						</TeamButton>
					))}
				</ModalContent>
			</ModalContainer>
		</Modal>
	)
}

export default SelectTeamModal
