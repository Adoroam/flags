const [, , ...args] = process.argv

const dashRegex = /^\-{1,2}/i

export const flags = (arr = args) => {
  const hasFlags = arr.some(str => dashRegex.exec(str))
  if (!hasFlags) return {}
  const chDashes = (str: string) => {
    const result = dashRegex.exec(str)
    return !!result ? result[0].length : 0
  }
  const flagMap = arr.map(chDashes)
  const rmDashes = (str: string) => str.replace(dashRegex, '').toLowerCase()
  return arr.reduce((a, c, i) => {
    if (!!flagMap[i]) {
      const flag = rmDashes(c)
      const multiFlag = flag.length > 1 && flagMap[i] === 1
      const data = flagMap[i + 1] === 0 ? arr[i + 1] : 1
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
