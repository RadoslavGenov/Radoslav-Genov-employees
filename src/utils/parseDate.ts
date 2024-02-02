export const parseDate = (dateStr: string | null): Date => {
  if (!dateStr || dateStr === 'NULL') {
    return new Date()
  }

  return new Date(dateStr)
}
