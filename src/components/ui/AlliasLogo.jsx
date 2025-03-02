import styled from 'styled-components/native'
import { Platform } from 'react-native'

const Logo = styled.View`
	border: 3px solid #00ffd2;
	background-color: #000;
	border-radius: 80px;
	margin-top: 50px;
	margin-bottom: 20px;
	padding: 0 20px;
	margin-bottom: 20px;
	padding: 10px;
	width: 160px;
	height: 160px;
	align-self: center;
	align-items: center;
	${Platform.OS === 'ios' && `justify-content: center;`}
`
const Logo2 = styled.Image`
	/* border: 3px solid #00ffd2; */
	/* background-color: #000; */
	/* border-radius: 80px; */
	margin-top: 50px;
	margin-bottom: 20px;
	padding: 0 20px;
	margin-bottom: 20px;
	padding: 10px;
	width: 260px;
	height: 260px;
	align-self: center;
	align-items: center;
	${Platform.OS === 'ios' && `justify-content: center;`}
`

const LogoText = styled.Text`
	text-shadow: 0 2px 4px rgba(0, 255, 234, 0.692);
	color: #fff;
	font-weight: bold;
	text-align: center;
	letter-spacing: 0px;
	font-size: 40px;
	line-height: 41px;
	transform: translateY(20px);
`

// const AliasLogo = () => {
// 	return (
// 		<Logo>
// 			<LogoText>Bible alias</LogoText>
// 		</Logo>
// 	)
// }
const AliasLogo = () => {
	return (
		<Logo2 source={require('../../../assets/prev.png')}>
			{/* <LogoText>Bible alias</LogoText> */}
		</Logo2>
	)
}

export default AliasLogo
