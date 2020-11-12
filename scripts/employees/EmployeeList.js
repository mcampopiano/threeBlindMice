import { getComputers, useComputers } from "../computers/computerDataProvider.js"
import { getDepartments, useDepartments } from "../departments/departmentProvider.js"
import { getLocations, useLocations } from "../locations/locationProvider.js"
import { getEmployees, useEmployees } from "./employeeDataProvider.js"
import {getCustomers, useCustomers} from "../customers/customerProvider.js"
import {getEmployeeCustomers, useEmployeeCustomers} from "../customers/employeeCustomerProvider.js"
const contentContainer = document.querySelector(".employeeCard")

let employeeArr = []
let computerArr = []
let departmentArr = []
let locationArr = []
let customers = []
let employeeCustomers = []

const render = () => {
        employeeArr.forEach(employee => {
            // Get the mathcing computer
            const computer = computerArr.find(computerObj => computerObj.id === employee.computerId)
            // Get the matching department
            const department = departmentArr.find(departObj => departObj.id === employee.departmentId)
            // Get the matching location
            const location = locationArr.find(lo => lo.id === employee.locationId)
            // Get the matching customers step 1: Filter through the join table array, store results in a variable
            const customerJoinTable = employeeCustomers.filter(obj => obj.employeeId === employee.id)
            // Get the matching customers step 2: map through the array created in step 1 and for each object, go into the customers array and find the matching customer Id. store results in a variable.
            const relatedCustomers = customerJoinTable.map(obj => {
                const customer = customers.find(co => co.id === obj.customerId)
                return customer
            })
            contentContainer.innerHTML += `
            <h2>${employee.firstName} ${employee.lastName}</h2>
            <p>Age: ${employee.age}</p>
            <p>Computer model: ${computer.model}</p>
            <p>Computer manufactuer year: ${computer.year}</p>
            <p>Department: ${department.name}</p>
            <p>Office: ${location.name}</p>
            <p>Customers Worked for:</p>
            <ul>
                ${relatedCustomers.map(customer => `<li>${customer.name}</li>`).join("")}
            </ul>
            `
        })
}

export const EmployeeList = () => {
    getEmployees()
    .then(getComputers)
    .then(getDepartments)
    .then(getLocations)
    .then(getCustomers)
    .then(getEmployeeCustomers)
    .then(() => {
        departmentArr = useDepartments()
        computerArr = useComputers()
        employeeArr = useEmployees()
        locationArr = useLocations()
        customers = useCustomers()
        employeeCustomers = useEmployeeCustomers()
        render()
    })
}