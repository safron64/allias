import React from 'react'
import styled from 'styled-components/native'

const StyledButton = styled.TouchableOpacity`
	margin: 10px;
	padding: 10px;
	background: #0b0b0b;
	color: #fff;
	font-weight: bold;
	border-radius: 10px;
	width: 60%;
	border: 1px solid #00ffd2;
	text-align: center;
`

const ButtonText = styled.Text`
	color: #fff;
	font-weight: bold;
	text-align: center;
`

const AddButton = ({ onPress, children }) => (
	<StyledButton onPress={onPress}>
		<ButtonText>{children}</ButtonText>
	</StyledButton>
)

export default AddButton
