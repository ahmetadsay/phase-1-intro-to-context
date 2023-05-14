function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, dateTimeString) {
    let [date, hour] = dateTimeString.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    });
    return employee;
  }
  
  function createTimeOutEvent(employee, dateTimeString) {
    let [date, hour] = dateTimeString.split(" ");
    employee.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date).hour;
    let timeOut = employee.timeOutEvents.find(event => event.date === date).hour;
    return (timeOut - timeIn) / 100;
  }
  
  function wagesEarnedOnDate(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(event => event.date);
    return dates.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employee, date), 0);
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
  }
  