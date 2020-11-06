import { getComputers, useComputers } from "../computers/computerDataProvider.js"
import { getEmployees, useEmployees } from "./employeeDataProvider.js"

const contentContainer = document.querySelector(".employeeCard")

const render = (employee, computer) => {
    contentContainer.innerHTML += `
    <h2>${employee.firstName} ${employee.lastName}</h2>
    <p>Age: ${employee.age}</p>
    <p>Computer model: ${computer.model}</p>
    <p>Computer manufactuer year: ${computer.year}</p>
    `
}

export const EmployeeList = () => {
    getEmployees()
    .then(getComputers)
    .then(() => {
        const computerArr = useComputers()
        const employeeArr = useEmployees()
        employeeArr.forEach(employee => {
            const computer = computerArr.find(computerObj => computerObj.id === employee.computerId)
            render(employee, computer)
        })

    })
}