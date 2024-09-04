import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import InitGame from '../screens/InitGameScreen'

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
				name="Init Game"
				component={InitGame}
				options={{
					title: 'Создание игры',
					headerStyle: {
						backgroundColor: '#0b0b0b',
					},
					headerTintColor: '#fff',
					headerShadowVisible: false,
				}}
			/>
		</Stack.Navigator>
	)
}
export default StackNavigator
