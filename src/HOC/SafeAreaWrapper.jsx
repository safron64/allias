import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'

const SafeAreaWrapper = (WrappedComponent, options = {}) => {
	return props => {
		const {
			statusBarStyle = 'light-content',
			statusBarHidden = false,
			backgroundColor = '#080808',
		} = options

		return (
			<SafeAreaView style={[styles.container, { backgroundColor }]}>
				<StatusBar
					barStyle={statusBarStyle}
					hidden={statusBarHidden}
					backgroundColor={backgroundColor}
				/>
				<WrappedComponent {...props} />
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

export default SafeAreaWrapper
