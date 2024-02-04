export const getDuration = (dateFrom: Date, dateTo: Date) => {
  const differenceInMs = dateTo.getTime() - dateFrom.getTime()

  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24)

  return Math.round(differenceInDays * 10) / 10
}
