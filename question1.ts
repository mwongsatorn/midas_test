// based on question examples, assume that clock hands are always on the number
function getClockAngle(hh_mm: string) : number {
  const [h,m] = hh_mm.split(":")
  const hvalue = parseInt(h) , mvalue = parseInt(m)
  const hhand = hvalue !== 0 && hvalue !== 12 ? hvalue % 12 : 12
  const mhand = mvalue !== 0 && mvalue !== 60 ? (mvalue % 60) / 5 : 12
  const distance = Math.min(Math.abs(hhand - mhand), 12 - Math.abs(hhand - mhand))
  return distance * 30
}

// this function assume that hours hand is not directly on the number 
function getClockAngle2(hh_mm: string) : number {
  const [h,m] = hh_mm.split(":")
  const hvalue = parseInt(h) , mvalue = parseInt(m)
  const hhand = hvalue !== 0 && hvalue !== 12 ? hvalue % 12 : 12
  const hhandangle = (hhand * 30) + (mvalue * 0.5)
  const mhandangle = mvalue * 6
  const angle = Math.min(Math.abs(hhandangle - mhandangle), 360 - Math.abs(hhandangle - mhandangle))
  return angle
}

console.log(getClockAngle("09:00")) // 90
console.log(getClockAngle("17:45")) // 120
console.log(getClockAngle("00:30")) // 180
console.log(getClockAngle("12:05")) // 30
console.log(getClockAngle("14:00")) // 60

