import { hasFlags } from './util'
import { Token, TType } from './flag.types'
import { tokenize } from './tokenize'
const [, , ...args] = process.argv

const spendTokens = (acc, { tType, tValue }: Token, i, tokenized) => {
  const next = tokenized[i + 1]
  const getValue = () => (!next.tType ? next.tValue : 1)
  switch (tType) {
    case TType.SINGLE:
      const singlesArr = tValue.split('').map(l => [l, getValue()])
      const output = Object.fromEntries(singlesArr)
      return { ...acc, ...output }
    case TType.DOUBLE:
      return { ...acc, [tValue]: getValue() }
    default:
      return acc
  }
}

export const flags = (arr = args) =>
  !hasFlags(arr) ? {} : tokenize(arr).reduce(spendTokens, {})

export default flags()
