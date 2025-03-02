import { Modal, Text, View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

const ModalContainer = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.8);
`

const ModalContent = styled.View`
	background-color: #121212;
	padding: 20px;
	border-radius: 15px;
	align-items: center;
	width: 90%;
`

const ModalText = styled.Text`
	font-size: 20px;
	color: #ffffff;
	font-weight: bold;
	margin-bottom: 20px;
	text-align: center;
`

const TeamButton = styled.TouchableOpacity`
	background-color: #00ffb3;
	padding: 15px 25px;
	margin: 10px;
	border-radius: 30px;
	width: 100%;
	align-items: center;
`

const TeamButtonText = styled.Text`
	color: #121212;
	font-size: 18px;
	font-weight: bold;
`

const SelectTeamModal = ({ visible, selectedTeams, handleTeamSelect }) => {
	return (
		<Modal visible={visible} transparent={true} animationType="fade">
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
