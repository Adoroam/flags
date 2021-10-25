import { hasFlags, chDashes, rmDashes } from './util'
const [, , ...args] = process.argv

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
