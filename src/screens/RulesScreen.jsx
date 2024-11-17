import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
	/* flex: 1; */
	background-color: #282828;
	justify-content: space-between;
	padding: 20px;
`

const Title = styled.Text`
	color: #00ffea;
	font-size: 24px;
	text-align: center;
	margin-bottom: 10px;
	font-weight: 500;
`

const Description = styled.Text`
	color: #ffffff;
	font-size: 14px;
	text-align: center;
	margin-bottom: 20px;
`

const Rule = styled.View`
	flex-direction: row;
	align-items: center;
	margin-bottom: 20px;
`

const RuleIcon = styled.View`
	width: 25px;
	height: 25px;
	background-color: rgba(0, 255, 234, 0.675);
	border-radius: 15px;
	margin-right: 15px;
`

const RuleText = styled.Text`
	color: #ffffff;
	font-size: 14px;
`

const RulesScreen = () => {
	return (
		<View style={{ backgroundColor: '#282828', flex: 1 }}>
			<Container>
				<StatusBar barStyle="light-content" />
				<Title>Bible allias</Title>
				<Description>
					Увлекательная командная игра для духовной компании
				</Description>

				<Rule>
					<RuleIcon />
					<RuleText>
						Задача каждого игрока – объяснить как можно больше
						библейских слов товарищам по команде за ограниченное
						время.
					</RuleText>
				</Rule>

				<Rule>
					<RuleIcon />
					<RuleText>
						Во время объяснения нельзя использовать однокоренные
						слова, озвучивать перевод с иностранных языков.
						Желательно, объяснять слова по Библии :)
					</RuleText>
				</Rule>

				<Rule>
					<RuleIcon />
					<RuleText>
						Отгаданное слово приносит команде одно очко, а за
						пропущенное слово команда штрафуется (в зависимости от
						настроек).
					</RuleText>
				</Rule>

				<Rule>
					<RuleIcon />
					<RuleText>
						Победителем становится команда, у которой количество
						очков достигло заранее установленного значения.
					</RuleText>
				</Rule>
			</Container>
		</View>
	)
}

export default RulesScreen
