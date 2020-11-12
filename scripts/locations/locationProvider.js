let locations = []

export const useLocations = () => locations.slice()

export const getLocations = () => {
    return fetch("http://localhost:8088/Locations")
    .then(r => r.json())
    .then(parsedLocations => locations = parsedLocations)
}