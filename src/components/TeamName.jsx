import React from 'react'
import styled from 'styled-components/native'
import Cross from './ui/Cross'

const TeamNameContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	background-color: #00ffea;
	margin-top: 5px;
	border-radius: 5px;
	border: 1px solid #000;
`

const TeamName = styled.Text`
	font-size: 24px;
	color: #000;
	margin: 10px;
`

const DeleteButton = styled.TouchableOpacity`
	padding: 0 10px;
	border-radius: 5px;
`

const TeamNameComponent = ({ team, onRemove, canRemove }) => (
	<TeamNameContainer>
		<TeamName>{team}</TeamName>
		{canRemove && (
			<DeleteButton onPress={onRemove}>
				<Cross />
			</DeleteButton>
		)}
	</TeamNameContainer>
)

export default TeamNameComponent
