import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import InitGameSrcreen from '../screens/InitGameScreen'
import RulesScreen from '../screens/RulesScreen'
import GameSettingsScreen from '../screens/SettingsGameScreen'
import StartGameScreen from '../screens/StartGameScreen'
import GameScreen from '../screens/GameScreen/GameScreen'
import RoundResultsScreen from '../screens/RoundResultsScreen'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{ title: 'Bible allias', headerShown: false }}
			/>
			<Stack.Screen
				name="InitGame"
				component={InitGameSrcreen}
				options={{
					title: 'Создание игры',
					headerStyle: {
						backgroundColor: 'rgb(11, 11, 11)',
					},
					headerTintColor: '#fff',
					headerShadowVisible: false,
				}}
			/>
			<Stack.Screen
				name="GameSettings"
				component={GameSettingsScreen}
				options={{
					title: 'Настройки игры',
					headerStyle: {
						backgroundColor: 'rgb(11, 11, 11)',
					},
					headerTintColor: '#fff',
					headerShadowVisible: false,
				}}
			/>
			<Stack.Screen
				name="StartGame"
				component={StartGameScreen}
				options={{
					title: 'Старт игры',
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="GameScreen"
				component={GameScreen}
				options={{ title: 'Игровой процесс', headerShown: false }}
			/>
			<Stack.Screen
				name="Rules"
				component={RulesScreen}
				options={{
					title: 'Правила',
					headerStyle: {
						backgroundColor: 'rgb(11, 11, 11)',
					},
					headerTintColor: '#fff',
					headerShadowVisible: false,
				}}
			/>
			<Stack.Screen
				name="RoundResultsScreen"
				component={RoundResultsScreen}
				options={{
					title: 'Result',
					headerShown: false,
					headerStyle: {
						backgroundColor: 'rgb(11, 11, 11)',
					},
					headerTintColor: '#fff',
					headerShadowVisible: true,
					headerLeft: () => null,
				}}
			/>
		</Stack.Navigator>
	)
}

export default StackNavigator
