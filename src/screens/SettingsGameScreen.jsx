import React from 'react'
import { View, Switch } from 'react-native'
import styled from 'styled-components/native'
import Slider from '@react-native-community/slider'
import useSettingsStore from '../store/SettingsStore' /// Путь к вашему хранилищу
import DropdownLevels from '../components/ui/Dropdown'

const Container = styled.View`
	flex: 1;
	background-color: #121212;
	padding: 20px;
	justify-content: space-between;
`

const Title = styled.Text`
	font-size: 24px;
	color: #00ffd2;
	margin-bottom: 20px;
	font-weight: 500;
`

const SettingItem = styled.View`
	margin-bottom: 20px;
`

const Label = styled.Text`
	font-size: 18px;
	color: #fff;
`

const SliderValue = styled.Text`
	font-size: 24px;
	color: #fff;
	text-align: right;
`

const Row = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

const Button = styled.TouchableOpacity`
	background-color: #000;
	padding: 20px;
	border-radius: 10px;
	align-items: center;
	justify-self: flex-end;
`

const ButtonText = styled.Text`
	color: white;
	font-size: 20px;
`

const GameSettingsScreen = ({ navigation }) => {
	const {
		wordCount,
		roundTime,
		penaltyEnabled,
		commonLastWord,
		soundEnabled,
		setWordCount,
		setRoundTime,
		setPenaltyEnabled,
		setCommonLastWord,
		setSoundEnabled,
	} = useSettingsStore()

	return (
		<Container>
			<View>
				<Title>Настройки</Title>

				<SettingItem>
					<Row>
						<Label>Количество слов</Label>

						<SliderValue>{wordCount}</SliderValue>
					</Row>
					<Slider
						minimumValue={10}
						maximumValue={100}
						step={5}
						value={wordCount}
						onValueChange={setWordCount}
					/>
				</SettingItem>

				<SettingItem>
					<Row>
						<Label>Время раунда (секунды)</Label>
						<SliderValue>{roundTime}</SliderValue>
					</Row>
					<Slider
						key={1}
						minimumValue={10}
						maximumValue={180}
						step={10}
						value={roundTime}
						onValueChange={setRoundTime}
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

				<SettingItem>
					<Row>
						<Label>Уровень</Label>
						<DropdownLevels key={1} />
					</Row>
				</SettingItem>
			</View>
			<Button onPress={() => navigation.navigate('StartGame')}>
				<ButtonText>Далее</ButtonText>
			</Button>
		</Container>
	)
}

export default GameSettingsScreen
