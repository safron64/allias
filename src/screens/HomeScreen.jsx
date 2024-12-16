import React from 'react'
import styled from 'styled-components/native'
import AlliasLogo from '../components/ui/AlliasLogo'
import { Text } from 'react-native'
import App from './../App'

const Container = styled.View`
	background-color: #282828;
`

const Buttons = styled.View`
	display: flex;
	margin-top: 30px;
	margin-bottom: 100px;
	padding: 0 20px;
	align-items: center;
	gap: 10px;
`
const Button = styled.TouchableOpacity`
	background-color: #000;
	padding: 10px;
	border-radius: 15px;
	width: 60%;
	padding-bottom: 12px;
	border: 1px solid #00ffea;
`

const ButtonText = styled(Text)`
	color: #fff;
	font-weight: bold;
	text-align: center;
	letter-spacing: 0px;
	font-size: 18px;
	text-shadow: 0 1px 4px rgba(0, 255, 234, 0.796);
`

const BG = styled.View`
	padding-top: 40px;
	padding-bottom: 80px;
	background-color: rgb(11, 11, 11);
	/* border-radius: 0 0 117px 117px; */
	border-bottom-right-radius: 117px;
	border-bottom-left-radius: 117px;
`
const HomeScreen = ({ navigation }) => {
	return (
		<Container style={{ flex: 1, justifyContent: 'space-between' }}>
			<BG>
				<AlliasLogo />
			</BG>
			<Buttons>
				<Button onPress={() => navigation.navigate('InitGame')}>
					<ButtonText>Новая Игра</ButtonText>
				</Button>
				<Button onPress={() => navigation.navigate('Rules')}>
					<ButtonText>Правила</ButtonText>
				</Button>
			</Buttons>
		</Container>
	)
}

export default HomeScreen
// onPress={() => navigation.navigate('Init Game')}
