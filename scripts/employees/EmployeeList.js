import { getComputers, useComputers } from "../computers/computerDataProvider.js"
import { getDepartments, useDepartments } from "../departments/departmentProvider.js"
import { getEmployees, useEmployees } from "./employeeDataProvider.js"

const contentContainer = document.querySelector(".employeeCard")

const render = (employee, computer, department) => {
    contentContainer.innerHTML += `
    <h2>${employee.firstName} ${employee.lastName}</h2>
    <p>Age: ${employee.age}</p>
    <p>Computer model: ${computer.model}</p>
    <p>Computer manufactuer year: ${computer.year}</p>
    <p>Department: ${department.name}</p>
    `
}

export const EmployeeList = () => {
    getEmployees()
    .then(getComputers)
    .then(getDepartments)
    .then(() => {
        const departmentArr = useDepartments()
        const computerArr = useComputers()
        const employeeArr = useEmployees()
        employeeArr.forEach(employee => {
            const computer = computerArr.find(computerObj => computerObj.id === employee.computerId)
            const department = departmentArr.find(departObj => departObj.id === employee.departmentId)
            render(employee, computer, department)
        })

    })
}