const [, , ...args] = process.argv
// finds strings starting with one or two dashes
const dashRegex = /^\-{1,2}/i
// check array to see if flags are present
const hasFlags = (arr: string[]) => arr.some(str => dashRegex.test(str))
// function to return number of dashes for supplied string (0,1, or 2)
export const chDashes = (str: string) => {
  const result = dashRegex.exec(str)
  return !!result ? result[0].length : 0
}
// function to remove leading dashes from supplied string
export const rmDashes = (str: string) => str.replace(dashRegex, '').toLowerCase()

export const flags = (arr=args) => {
  if (!hasFlags(arr)) return {}
  const squished = arr.map(l => !!chDashes(l) ? '@_@' + l + '@_@' : l)
    .join(' ')
    .split('@_@')
    .map(x => x.trim())
    .filter(x => x !== '')
  const flagMap = squished.map(chDashes)
  return squished.reduce((a, c, i) => {
    if (!!flagMap[i]) {
      const flag = rmDashes(c)
      const multiFlag = flag.length > 1 && flagMap[i] === 1
      const data = flagMap[i + 1] === 0 ? squished[i + 1] : 1
      const flagObject = multiFlag
        ? Object.fromEntries(flag.split('').map(l => [l, data]))
        : { [flag]: data }
      return { ...a, ...flagObject }
    } else {
      return a
    }
  }, {})
}

export default flags()
