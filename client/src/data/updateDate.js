function updateSquares(selectedMonth = 0, selectedYear = 0) {
  
  
  
  const lastMDate = new Date(selectedYear, selectedMonth, 0).getDate();
  const lastMDay = new Date(selectedYear, selectedMonth, 1).getDay();
  const firstDay = new Date(selectedYear, selectedMonth, 2).getDay();
  const endDate = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    console.log(firstDay)
  let arr = [];
  if (firstDay === 1) {
    for (let i = 1; i <= endDate; i++) {
      arr = [...arr, i];
    }
  } else {
    let num = lastMDate;
    for (let i = lastMDay; i >= 1; i--) {
      arr = [num, ...arr];
      num--
    }

    for (let i = 1; i <= endDate; i++) {
      arr = [...arr, i];
    }
  }
  console.log(arr)
  return arr;
}

export { updateSquares };
