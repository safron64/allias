import styled from 'styled-components/native'

const Logo = styled.View`
	border: 3px solid #00ffea;
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

const AlliasLogo = () => {
	return (
		<Logo>
			<LogoText>Bible allias</LogoText>
		</Logo>
	)
}

export default AlliasLogo
