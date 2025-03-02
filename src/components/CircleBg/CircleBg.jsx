// components/CircleBg/CircleBg.js
import React, { memo } from 'react'
import { Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import styled from 'styled-components/native'

export const CircleBg = memo(function CircleBg({
	translateY,
	currentWord,
	fontSize,
	adjustFontSize,
}) {
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
	}))

	return (
		<Animated.View style={[animatedStyle]}>
			<LinearGradient
				colors={['#00ffd2', '#000']}
				start={{ x: 1, y: 2 }}
				end={{ x: 0, y: 0 }}
				style={{
					width: 270,
					height: 270,
					borderRadius: 150,
					justifyContent: 'center',
					alignItems: 'center',
					padding: 10,
					...Platform.select({
						ios: {
							shadowColor: '#000',
							shadowOffset: { width: 0, height: 10 },
							shadowOpacity: 0.25,
							shadowRadius: 10,
						},
						android: {
							elevation: 20,
						},
					}),
				}}
			>
				<WordText
					fontSize={fontSize}
					onLayout={adjustFontSize}
					adjustsFontSizeToFit
					numberOfLines={3}
					minimumFontScale={0.5}
				>
					{currentWord}
				</WordText>
			</LinearGradient>
		</Animated.View>
	)
})

const WordText = styled.Text`
	font-size: ${props => props.fontSize}px;
	font-weight: bold;
	color: #fff;
	text-align: center;
	width: 90%;
`
