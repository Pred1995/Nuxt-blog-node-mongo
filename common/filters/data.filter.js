export default function (val, type) {
  const date = new Date(val)
  if (type === 'date') {
    return date.toLocaleDateString()
  } else if (type === 'time') {
    return date.toLocaleTimeString()
  }
  return date.toLocaleString()
}
