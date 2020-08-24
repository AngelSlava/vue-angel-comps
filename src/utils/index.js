export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}


export function compareObjects(obj1, obj2, exception = []) {
  let isTween = false
  const params1 = Object.keys(obj1) || []
  const params2 = Object.keys(obj2) || []

  exception.forEach(item => {
    delete obj1[item]
    delete obj2[item]
  })

  if (params1.length === params2.length) {
    params1.filter(param => {
      if (Array.isArray(obj1[param]) && Array.isArray(obj2[param])) {
        isTween = !arrayDiff(obj1[param], obj2[param]).length
      } else {
        isTween = obj1[param] === obj2[param]
      }
    })
  }

  if (!params1.length && !params1.length === !params2.length) isTween = true
  return isTween
}

function arrayDiff(a1, a2) {
  return a1.filter(i => !a2.includes(i)).concat(a2.filter(i => !a1.includes(i)))
}


export function uniqueArray(arr) {
  return Array.from(new Set(arr))
}
