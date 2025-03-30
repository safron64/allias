import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'

const SafeAreaWrapper = (WrappedComponent, options = {}) => {
	return props => {
		const {
			statusBarStyle = 'light-content',
			statusBarHidden = false,
			backgroundColor = '#080808',
			bottomBackgroundColor = backgroundColor,
		} = options

		return (
			<>
				<SafeAreaView
					style={[styles.topContainer, { backgroundColor }]}
					edges={['top']} // Только верхняя часть
				>
					<StatusBar
						barStyle={statusBarStyle}
						hidden={statusBarHidden}
						backgroundColor={backgroundColor}
					/>
				</SafeAreaView>

				<SafeAreaView
					style={[
						styles.bottomContainer,
						{ backgroundColor: bottomBackgroundColor },
					]}
					edges={['bottom']}
				>
					<WrappedComponent {...props} />
				</SafeAreaView>
			</>
		)
	}
}

const styles = StyleSheet.create({
	topContainer: {
		flex: 0,
	},
	bottomContainer: {
		flex: 1,
	},
})

export default SafeAreaWrapper
