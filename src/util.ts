const dashRegex = /^\-{1,2}/i

const dash = (str: string) => dashRegex.test(str)
export const hasFlags = (arr: string[]) => arr.some(dash)

export const chDashes = (str: string) =>
  !!dash(str) ? dashRegex.exec(str)[0].length : 0

export const rmDashes = (str: string) =>
  str.replace(dashRegex, '').toLowerCase()
