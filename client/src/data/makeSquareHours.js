

let hrs = []

for (let i = 0; i < 96; i++) {
    if (i % 4 === 0 && i < 48) {
        hrs.push(`${i / 4 + 1}`)
    } else if (i % 4 === 0 && i >= 48) {
        const x = `${Math.floor(i / 4  + 1 - 12)}`
        hrs.push(x)
    }
}
console.log(hrs)
export default hrs