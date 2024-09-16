import React from 'react'
import styled from 'styled-components/native'

const StyledButton = styled.TouchableOpacity`
	color: #fff;
	font-size: 20px;
	padding: 20px;
	background: rgb(11, 11, 11);
	text-align: center;
	border-radius: 10px;
	margin: 20px;
`

const ButtonText = styled.Text`
	color: #fff;
	font-size: 20px;
	text-align: center;
	text-shadow: 0 1px 4px rgba(0, 255, 234, 0.796);
`

const StartGameButton = ({ onPress, children }) => (
	<StyledButton onPress={onPress}>
		<ButtonText>{children}</ButtonText>
	</StyledButton>
)

export default StartGameButton
