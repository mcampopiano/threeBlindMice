import { getComputers, useComputers } from "../computers/computerDataProvider.js"
import { getDepartments, useDepartments } from "../departments/departmentProvider.js"
import { getLocations, useLocations } from "../locations/locationProvider.js"
import { getEmployees, useEmployees } from "./employeeDataProvider.js"

const contentContainer = document.querySelector(".employeeCard")

let employeeArr = []
let computerArr = []
let departmentArr = []
let locationArr = []

const render = () => {
        employeeArr.forEach(employee => {
            const computer = computerArr.find(computerObj => computerObj.id === employee.computerId)
            const department = departmentArr.find(departObj => departObj.id === employee.departmentId)
            const location = locationArr.find(lo => lo.id === employee.locationId)
            contentContainer.innerHTML += `
            <h2>${employee.firstName} ${employee.lastName}</h2>
            <p>Age: ${employee.age}</p>
            <p>Computer model: ${computer.model}</p>
            <p>Computer manufactuer year: ${computer.year}</p>
            <p>Department: ${department.name}</p>
            <p>Office: ${location.name}</p>
            `
        })
}

export const EmployeeList = () => {
    getEmployees()
    .then(getComputers)
    .then(getDepartments)
    .then(getLocations)
    .then(() => {
        departmentArr = useDepartments()
        computerArr = useComputers()
        employeeArr = useEmployees()
        locationArr = useLocations()
        render()
    })
}