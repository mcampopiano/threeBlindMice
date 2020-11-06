let employees = []

export const useEmployees = () => employees.slice()

export const getEmployees = () => {
    return fetch("http://localhost:8088/employees")
    .then(response => response.json())
    .then(parsedEmployees => employees = parsedEmployees)
}