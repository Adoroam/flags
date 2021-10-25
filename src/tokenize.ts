import { chDashes, rmDashes } from './util'
import { TType } from './flag.types'

export const tokenize = words => [
  ...words.reduce((acc, word, index) => {
    const end = acc.length - 1
    const [tType, last] = [chDashes(word), acc[end]]
    !!acc.length && !last.tType && !tType
      ? (acc[end] = { ...last, tValue: `${last.tValue} ${word}` })
      : (acc = [...acc, { tType, tValue: rmDashes(word), index }])
    return acc
  }, []),
  { tType: TType.EOL, tValue: '', index: words.length },
]
