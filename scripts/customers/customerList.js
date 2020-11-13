import { getEmployees, useEmployees } from "../employees/employeeDataProvider.js"
import {getCustomers, useCustomers} from "./customerProvider.js"
import {getEmployeeCustomers, useEmployeeCustomers} from "./employeeCustomerProvider.js"
const contentContainer = document.querySelector(".customerCards")

let employeeArr = []
let customers = []
let employeeCustomers = []

const render = () => {
        let customerString = ""
        customers.forEach(customer => {
            // Get the matching employees step 1: Filter through the join table array, store results in a variable
            const customerJoinTable = employeeCustomers.filter(obj => obj.customerId === customer.id)
            // Get the matching employees step 2: map through the array created in step 1 and for each object, go into the customers array and find the matching customer Id. store results in a variable.
            const relatedEmployees = customerJoinTable.map(obj => {
                const employee = employeeArr.find(eo => eo.id === obj.employeeId)
                return employee
            })
            customerString += `
            <div class = "customerCard">
            <h3>${customer.name}</h3>
            <p>Employees :</p>
            <ul>
                ${relatedEmployees.map(employee => `<li>${employee.firstName} ${employee.lastName}</li>`).join("")}
            </ul>
            </div>
            `
        })
        contentContainer.innerHTML = `<h2>Customer List</h2> ${customerString}`
}

export const CustomerList = () => {
    getEmployees()
    .then(getCustomers)
    .then(getEmployeeCustomers)
    .then(() => {
        employeeArr = useEmployees()
        customers = useCustomers()
        employeeCustomers = useEmployeeCustomers()
        render()
    })
}