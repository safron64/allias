import React, { useState } from 'react'
import { View, Text, Switch } from 'react-native'
import styled from 'styled-components/native'
import Slider from '@react-native-community/slider'

const Container = styled.View`
	flex: 1;
	background-color: #f5f5f5;
	padding: 20px;
`

const Title = styled.Text`
	font-size: 24px;
	color: #ffa500;
	margin-bottom: 20px;
`

const SettingItem = styled.View`
	margin-bottom: 20px;
`

const Label = styled.Text`
	font-size: 18px;
	color: #000;
`

const SliderValue = styled.Text`
	font-size: 24px;
	color: #000;
	text-align: right;
`

const Row = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

const Emoji = styled.Text`
	font-size: 32px;
`

const Button = styled.TouchableOpacity`
	background-color: #00aaff;
	padding: 15px;
	border-radius: 8px;
	align-items: center;
`

const ButtonText = styled.Text`
	color: white;
	font-size: 18px;
`

const GameSettingsScreen = () => {
	const [wordCount, setWordCount] = useState(40)
	const [roundTime, setRoundTime] = useState(70)
	const [penaltyEnabled, setPenaltyEnabled] = useState(true)
	const [commonLastWord, setCommonLastWord] = useState(false)
	const [soundEnabled, setSoundEnabled] = useState(true)

	return (
		<Container>
			<Title>Настройки</Title>

			<SettingItem>
				<Row>
					<Label>Количество слов</Label>
					<SliderValue>{wordCount}</SliderValue>
				</Row>
				<Slider
					minimumValue={10}
					maximumValue={100}
					step={1}
					value={wordCount}
					onValueChange={value => setWordCount(value)}
				/>
			</SettingItem>

			<SettingItem>
				<Row>
					<Label>Время раунда (секунды)</Label>
					<SliderValue>{roundTime}</SliderValue>
				</Row>
				<Slider
					minimumValue={30}
					maximumValue={180}
					step={10}
					value={roundTime}
					onValueChange={value => setRoundTime(value)}
				/>
			</SettingItem>

			<SettingItem>
				<Row>
					<Label>Штраф за пропуск</Label>
					<Switch
						value={penaltyEnabled}
						onValueChange={setPenaltyEnabled}
					/>
				</Row>
			</SettingItem>

			<SettingItem>
				<Row>
					<Label>Общее последнее слово</Label>
					<Switch
						value={commonLastWord}
						onValueChange={setCommonLastWord}
					/>
				</Row>
			</SettingItem>

			<SettingItem>
				<Row>
					<Label>Звук в игре</Label>
					<Switch
						value={soundEnabled}
						onValueChange={setSoundEnabled}
					/>
				</Row>
			</SettingItem>

			<Button>
				<ButtonText>Далее</ButtonText>
			</Button>
		</Container>
	)
}

export default GameSettingsScreen
