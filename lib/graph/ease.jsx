export default ({ index, count, initialDuration }) => {
  const finalDuration = 1 - initialDuration
  const itemDurationIncrement = finalDuration / (count - 1)
  const itemDuration = initialDuration + index * itemDurationIncrement
  return (t) => Math.min(t * (1 / itemDuration), 1)
}
