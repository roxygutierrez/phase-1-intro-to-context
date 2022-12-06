// Your code here
const createEmployeeRecord = (employeeArray) => {
  const employee = {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employee;
};

const createEmployeeRecords = (employeeArrays) => {
  const newEmployees = employeeArrays.map(createEmployeeRecord);
  return newEmployees;
};

const createTimeInEvent = (employeeObject, dateStamp) => {
  const newTimeInEvents = {
    type: "TimeIn",
    hour: parseInt(dateStamp.split(" ")[1]),
    date: dateStamp.split(" ")[0],
  };
  employeeObject.timeInEvents.push(newTimeInEvents);
  return employeeObject;
};

const createTimeOutEvent = (employeeObject, dateStamp) => {
  const newTimeOutEvents = {
    type: "TimeOut",
    hour: parseInt(dateStamp.split(" ")[1]),
    date: dateStamp.split(" ")[0],
  };
  employeeObject.timeOutEvents.push(newTimeOutEvents);
  return employeeObject;
};

const hoursWorkedOnDate = (employeeObject, dateForm) => {
  const timeIn = employeeObject.timeInEvents.filter((event) => {
    return event.date === dateForm;
  });
  const timeOut = employeeObject.timeOutEvents.filter((event) => {
    return event.date === dateForm;
  });
  return (timeOut[0].hour - timeIn[0].hour) / 100;
};

const wagesEarnedOnDate = (employeeObject, dateForm) => {
  const totalPay =
    hoursWorkedOnDate(employeeObject, dateForm) * employeeObject.payPerHour;
  return totalPay;
};

const allWagesFor = (employeeObject) => {
  const daysWorked = employeeObject.timeInEvents.map((event) => event.date);
  const totalComp = daysWorked.reduce((runningSum, dayWorked) => {
    return wagesEarnedOnDate(employeeObject, dayWorked) + runningSum;
  }, 0);
  //   let totalComp = 0;
  //   for (let i = 0; i < daysWorked.length; i++) {
  //     const dayWorked = daysWorked[i];
  //     const daysWages = wagesEarnedOnDate(employeeObject, dayWorked);
  //     totalComp = daysWages + totalComp;
  //   }
  return totalComp;
};

const calculatePayroll = (employeeArray) => {
  //   let totalPayroll = 0;
  //   for (let i = 0; i < employeeArray.length; i++) {
  //     totalPayroll += allWagesFor(employeeArray[i]);
  //   }
  // return totalPayroll;

  const totalPayroll = employeeArray.reduce((accumulator, employee) => {
    return allWagesFor(employee) + accumulator;
  }, 0);
  return totalPayroll;
};
