import { useState } from 'react'
import styled from 'styled-components/native'
import ModalSelector from 'react-native-modal-selector'
import useSettingsStore from '../../store/SettingsStore'

const DropdownLabel = styled.Text`
	font-size: 18px;
	padding: 10px;
	color: #009688;
	font-weight: 500;
`

const DropdownLevels = () => {
	const [selectedValue, setSelectedValue] = useState('Средний')
	const setDifficultyLevel = useSettingsStore(
		state => state.setDifficultyLevel
	)

	const data = [
		{ key: 1, label: 'Легкий' },
		{ key: 2, label: 'Средний' },
		{ key: 3, label: 'Сложный' },
		{ key: 4, label: 'Невозможный' },
	]

	const handleSelection = option => {
		setSelectedValue(option.label)
		setDifficultyLevel(option.key)
	}

	return (
		<ModalSelector
			key={1}
			data={data}
			initValue="Выберете уровень"
			onChange={handleSelection}
			backdropPressToClose={true}
			animationType="fade"
			selectTextStyle={{ color: 'rgb(0, 255, 234)', fontSize: 16 }}
			optionTextStyle={{ color: 'rgb(0, 255, 234)', fontSize: 19 }}
			optionContainerStyle={{ backgroundColor: '#282828' }}
			sectionTextStyle={{ color: '#000', fontSize: 20 }}
			cancelText="Отмена"
			cancelStyle={{ backgroundColor: '#282828' }}
			cancelTextStyle={{ color: '#fff' }}
			optionStyle={{
				borderBottomColor: '#ffffff60',
			}}
		>
			<DropdownLabel>{selectedValue}</DropdownLabel>
		</ModalSelector>
	)
}

export default DropdownLevels
