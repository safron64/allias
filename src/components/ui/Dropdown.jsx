import { useState } from 'react'
import styled from 'styled-components/native'
import { Picker } from '@react-native-picker/picker'
import useSettingsStore from '../../store/SettingsStore'

const DropdownLabel = styled.Text`
	font-size: 18px;
	padding: 10px;
	color: #009688;
	font-weight: 500;
`

const PickerContainer = styled.View`
	border: 1px solid #009688;
	border-radius: 5px;
	margin: 10px 0;
	background-color: transparent;
	width: 200px;
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

	const handleSelection = (key, label) => {
		setSelectedValue(label)
		setDifficultyLevel(key)
	}

	return (
		<>
			{/* <DropdownLabel>{selectedValue}</DropdownLabel> */}
			<PickerContainer>
				<Picker
					selectedValue={selectedValue}
					onValueChange={(itemValue, itemIndex) =>
						handleSelection(data[itemIndex].key, itemValue)
					}
					mode="dropdown"
					style={{
						color: 'rgb(0, 255, 234)',
						fontSize: 14,
						backgroundColor: '#000000',
					}}
				>
					{data.map(item => (
						<Picker.Item
							key={item.key}
							label={item.label}
							value={item.label}
						/>
					))}
				</Picker>
			</PickerContainer>
		</>
	)
}

export default DropdownLevels
