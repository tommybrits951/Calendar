

export default function updateDate(year, month) {
    const dayOne = new Date(year, month, 1).getDay()
    const lastMDate = new Date(year, month, 0).getDate()
    const lastMDay = new Date(year, month, 0).getDay()
    const endDate = new Date(year, parseInt(month) + 1, 0).getDate()
    
    let tmp = []
    let arr = []
    
    console.log(endDate)
    if (dayOne !== 0) {
      let num = lastMDate
      for (let i = lastMDay; i >= 0; i--) {
        const x = new Date(year, month - 1, num).getTime()
        arr = [num, ...arr]
        tmp = [x, ...tmp]
        num--
      }
    }
    for (let i = 1; i <= endDate; i++) {
      const x = new Date(year, month, i).getTime()
      arr = [...arr, i]
      tmp = [...tmp, x]
    }
    return {tmp, arr}
}