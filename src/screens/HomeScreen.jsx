import React from 'react'

import { View , Button} from 'react-native-web'
import styled from 'styled-components/native'

const Container = styled.View`
	background-color: #000;
`

const HomeScreen = ({ navigation }) => {
	return (
		<Container
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			<Button
				title="Go to Details"
				onPress={() => navigation.navigate('Init Game')}
			/>
		</Container>
	)
}

export default HomeScreen
