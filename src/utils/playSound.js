import { Audio } from 'expo-av'

const playSound = async (soundFile, volume = 0.5) => {
	const { sound } = await Audio.Sound.createAsync(soundFile)
	await sound.setVolumeAsync(volume)
	await sound.playAsync()
	sound.setOnPlaybackStatusUpdate(status => {
		if (status.didJustFinish) {
			sound.unloadAsync()
		}
	})
}

export default playSound
