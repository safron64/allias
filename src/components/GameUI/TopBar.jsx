// components/GameUI/TopBar.js
import React from 'react'
import styled from 'styled-components/native'

export const TopBar = ({ currentTeam, guessedWords }) => {
	return (
		<TopBarContainer>
			<TopBarText>{currentTeam}</TopBarText>
			<Score>{guessedWords}</Score>
			<TopBarText>ОТГАДАНО</TopBarText>
		</TopBarContainer>
	)
}

const TopBarContainer = styled.View`
	position: absolute;
	top: 0;
	width: 100%;
	background-color: #080808;
	padding-top: 40px;
	padding-bottom: 10px;
	justify-content: center;
	align-items: center;
	z-index: 9999;
`

const TopBarText = styled.Text`
	font-size: 18px;
	color: #fff;
	font-weight: bold;
`

const Score = styled.Text`
	font-size: 48px;
	color: #fff;
	font-weight: bold;
	margin: 5px 0;
`
