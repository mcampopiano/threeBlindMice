let customers = []

export const useCustomers = () => customers.slice()

export const getCustomers = () => {
    return fetch("http://localhost:8088/Customers")
    .then(r => r.json())
    .then(parsedData => customers = parsedData)
}