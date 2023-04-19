function createEmployeeRecord (employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords (employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent (timeIn) {
    const [date, hour] = timeIn.split(" ");

    const timeInObj = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    }

    this.timeInEvents.push(timeInObj);
    return this;
}

function createTimeOutEvent (timeOut) {
    const [date, hour] = timeOut.split(" ");

    const timeOutObj = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    }

    this.timeOutEvents.push(timeOutObj);
    return this;
}

function hoursWorkedOnDate (date) {
    const timeInElement = this.timeInEvents.find(element => element.date === date);
    const timeOutElement = this.timeOutEvents.find(element => element.date === date);

    return (timeOutElement.hour - timeInElement.hour) / 100;
}

function wagesEarnedOnDate (date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

function findEmployeeByFirstName (srcArray, firstName) {
    return srcArray.find(element => element.firstName === firstName)
}

function calculatePayroll (employees) {
    return employees.reduce(function (accumulator, element) {
        return allWagesFor.call(element) + accumulator
    }, 0);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

