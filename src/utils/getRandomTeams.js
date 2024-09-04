export const getRandomTeams = (teamsArray, numTeams) => {
	const selected = []
	while (selected.length < numTeams) {
		const randomIndex = Math.floor(Math.random() * teamsArray.length)
		const chosenTeam = teamsArray[randomIndex]
		if (!selected.includes(chosenTeam)) {
			selected.push(chosenTeam)
		}
	}
	return selected
}
