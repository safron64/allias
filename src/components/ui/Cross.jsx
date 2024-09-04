import React from 'react'
import styled from 'styled-components/native'

const CrossContainer = styled.View`
	width: 15px;
	height: 15px;
	justify-content: center;
	align-items: center;
`

const CrossLine = styled.View`
	position: absolute;
	width: 100%;
	height: 2px;
	background-color: #000;
`

const Cross = () => (
	<CrossContainer>
		<CrossLine style={{ transform: [{ rotate: '45deg' }] }} />
		<CrossLine style={{ transform: [{ rotate: '-45deg' }] }} />
	</CrossContainer>
)

export default Cross
