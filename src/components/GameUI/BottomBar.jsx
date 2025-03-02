// components/GameUI/BottomBar.js
import React from 'react'
import styled from 'styled-components/native'

export const BottomBar = ({ skippedWords, timer, timerEnded }) => {
	return (
		<BottomBarContainer>
			<BottomBarText>ПРОПУЩЕНО</BottomBarText>
			<ScoreBottom>{skippedWords}</ScoreBottom>
			{timerEnded ? (
				<Timer>Финальное слово</Timer>
			) : (
				<Timer>{`00:${timer < 10 ? `0${timer}` : timer}`}</Timer>
			)}
		</BottomBarContainer>
	)
}

const BottomBarContainer = styled.View`
	position: absolute;
	bottom: 0;
	width: 100%;
	background-color: #080808;
	padding-top: 10px;
	padding-bottom: 20px;
	justify-content: center;
	align-items: center;
`

const BottomBarText = styled.Text`
	font-size: 18px;
	color: #fff;
	font-weight: bold;
`

const ScoreBottom = styled.Text`
	font-size: 48px;
	color: #fff;
	font-weight: bold;
	margin: 5px 0;
`

const Timer = styled.Text`
	font-size: 24px;
	color: #00ffd2;
	margin-top: 5px;
	font-weight: bold;
`
