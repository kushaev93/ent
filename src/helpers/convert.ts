export function toDate(timestamp: number) {
  const date = new Date(timestamp * 1000)
  const day = `0${date.getDate()}`.slice(-2)
  const month = `0${date.getMonth() + 1}`.slice(-2)
  const year = date.getFullYear()
  const hours = `${date.getHours() < 10 ? '0' : ''}${date.getHours()}`
  const minutes = `${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
  return `${day}.${month}.${year} ${hours}:${minutes}`
}

export function short(str: string) {
  if (str.length > 150) {
    return `${str.substring(0, 100)} ...`
  }
  return str
}
