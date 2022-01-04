// why can't you use destructuring here like this: just setting variables in the function
// function createEmployeeRecord(empArray) {
//      const [firstName, familyName, title, payPerHour]  = empArray
// }

// why doesn't this work? it won't pass the tests but works in the browser? return not implicitly called, and needs to be object
// function createEmployeeRecord(empArray) { 
//         firstName: empArray[0],
//         familyName: empArray[1],
//         title: empArray[2],
//         payPerHour: empArray[3]
// }

let createEmployeeRecord = function(empArray){
    return {
        firstName: empArray[0],
        familyName: empArray[1],
        title: empArray[2],
        payPerHour: empArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(arrays) {
    return arrays.map(function(empArray){
        return createEmployeeRecord(empArray)
    })
}

let createTimeInEvent = function(emp, datetime) {
    let [date, hour] = datetime.split(' ')

    emp.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return emp
}

let createTimeOutEvent = function(emp, datetime) {
    let [date, hour] = datetime.split(' ')

    emp.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return emp
}

let hoursWorkedOnDate = function(emp, date){
    let timeIn = emp.timeInEvents.find(function(e){
        return e.date === date
    })
    let timeOut = emp.timeOutEvents.find(function(e){
        return e.date === date
    })
    return (timeOut.hour - timeIn.hour)/100
}

let wagesEarnedOnDate = function(emp, date){
    return hoursWorkedOnDate(emp, date) * emp.payPerHour
}

let allWagesFor = function(emp){
    let dates = emp.timeInEvents.map(function(e){
        return e.date
    })

    let amount = dates.reduce(function(all, d){
        return all + wagesEarnedOnDate(emp, d)
    }, 0)

    return amount
}

let calculatePayroll = function(empsArray){
    return empsArray.reduce(function(all, emp){
        return all + allWagesFor(emp)
    }, 0)
}

let findEmployeeByFirstName = function(empsArray, firstName){
    return empsArray.find(function(emp){
        return emp.firstName === firstName
    })
}