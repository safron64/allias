import React from 'react'
import styled from 'styled-components/native'

const StyledButton = styled.TouchableOpacity`
	color: #fff;
	font-size: 20px;
	padding: 20px;
	background: #000;
	text-align: center;
`

const ButtonText = styled.Text`
	color: #fff;
	font-size: 20px;
	text-align: center;
`

const StartGameButton = ({ onPress, children }) => (
	<StyledButton onPress={onPress}>
		<ButtonText>{children}</ButtonText>
	</StyledButton>
)

export default StartGameButton
