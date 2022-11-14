export const deserializePlanetaryInfo = (planet) => {
	const data = {
		author: planet.copyright || "",
		date: planet.date || "",
		description: planet.explanation || "",
		title: planet.title || "",
		image: {
			thumbnail: planet.url || "",
			src: planet.hdurl || "",
			alt: planet.title || "",
		},
	};
	return data;
};

export const deserializePlanetaryList = (planetList) => {
	return planetList.map((planet) => deserializePlanetaryInfo(planet));
};
