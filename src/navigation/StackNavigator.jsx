import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import InitGameSrcreen from '../screens/InitGameScreen'
import RulesScreen from '../screens/RulesScreen'
import GameSettingsScreen from '../screens/GameSettingsScreen'
import StartGameScreen from '../screens/StartGameScreen'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{ title: 'Bible alias', headerShown: false }}
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
					title: 'Настройки игры',
					headerShown: false,
				}}
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
		</Stack.Navigator>
	)
}

export default StackNavigator
