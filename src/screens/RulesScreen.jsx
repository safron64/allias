import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import styled from 'styled-components/native'
import SafeAreaWrapper from '../HOC/SafeAreaWrapper'

const Container = styled.View`
	background-color: #121212;
	justify-content: space-between;
	padding: 20px;
	align-items: center;
`

const Title = styled.Text`
	color: #00ffd2;
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
	margin-left: 10px;
`

const RuleIcon = styled.View`
	width: 25px;
	height: 25px;
	background-color: rgba(0, 255, 234, 0.675);
	border-radius: 12.5px;
	margin-right: 15px;
`

const Rule = styled.View`
	flex-direction: row;
	align-items: center;
	margin-bottom: 20px;
`

const RuleText = styled.Text`
	color: #ffffff;
	font-size: 14px;
	flex-shrink: 1;
`

const Column = styled.View`
	width: 100%;
	align-items: flex-start;
`

const RulesScreen = () => {
	return (
		<View style={{ backgroundColor: '#121212', flex: 1 }}>
			<Container>
				<StatusBar barStyle="light-content" />
				<Title>Bible alias</Title>
				<Description>
					Увлекательная командная игра для духовной компании
				</Description>

				<Column>
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
							пропущенное слово команда штрафуется (в зависимости
							от настроек).
						</RuleText>
					</Rule>

					<Rule>
						<RuleIcon />
						<RuleText>
							Победителем становится команда, у которой количество
							очков достигло заранее установленного значения.
						</RuleText>
					</Rule>
				</Column>
			</Container>
		</View>
	)
}

export default SafeAreaWrapper(React.memo(RulesScreen), {
	statusBarStyle: 'light-content',
	statusBarHidden: false,
	backgroundColor: '#121212',
})
