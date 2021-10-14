const [, , ...args] = process.argv
// finds strings starting with one or two dashes
const dashRegex = /^\-{1,2}/i
// function to return number of dashes for supplied string (0,1, or 2)
export const chDashes = (str: string) => {
  const result = dashRegex.exec(str)
  return !!result ? result[0].length : 0
}
// function to remove leading dashes from supplied string
export const rmDashes = (str: string) => str.replace(dashRegex, '').toLowerCase()

// uses process.argv if no array supplied
export const flags = (arr=args) => {
  // check to see if any flags are present
  const hasFlags = arr.some(str => dashRegex.exec(str))
  // if no flags, return empty object
  if (!hasFlags) return {}
  // a mapped copy of the array where each entry is number of dashes
  const flagMap = arr.map(chDashes)
  // reduce function to create flags object
  return arr.reduce((a, c, i) => {
    // check to see if entry has flags
    if (!!flagMap[i]) {
      // get the flag or "key" by removing the dashes
      const flag = rmDashes(c)
      // find out if flag is single dash and more than one letter
      const multiFlag = flag.length > 1 && flagMap[i] === 1
      // this part is what needs work
      // checks following index to see if it has a flag, if not, use as data
      const data = flagMap[i + 1] === 0 ? arr[i + 1] : 1
      // create object for the flag/s or "key/s" and data
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
