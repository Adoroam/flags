import { TType } from './flag.types'
import { tokenize } from './tokenize'

describe('tokenize', () => {
  test('EOL token when no flags supplied', () => {
    const mock = []
    const mockOut = [{ tType: TType.EOL, tValue: '', index: 0 }]
    expect(tokenize(mock)).toStrictEqual(mockOut)
  })
  test('blank object when only string', () => {
    const mock = 'string'.split(' ')
    const mockOut = [
      { tType: TType.VALUE, tValue: 'string', index: 0 },
      { tType: TType.EOL, tValue: '', index: 1 },
    ]
    expect(tokenize(mock)).toStrictEqual(mockOut)
  })
  test('blank object when only string with spaces', () => {
    const mock = 'test string'.split(' ')
    const mockOut = [
      { tType: TType.VALUE, tValue: 'test string', index: 0 },
      { tType: TType.EOL, tValue: '', index: 2 },
    ]
    expect(tokenize(mock)).toStrictEqual(mockOut)
  })
  test('single flag, no data', () => {
    const mock = ['-x']
    const mockOut = [
      { tType: TType.SINGLE, tValue: 'x', index: 0 },
      { tType: TType.EOL, tValue: '', index: 1 },
    ]
    expect(tokenize(mock)).toStrictEqual(mockOut)
  })
  test('single flag, with data', () => {
    const mock = '-x hotdog'.split(' ')
    const mockOut = [
      { tType: TType.SINGLE, tValue: 'x', index: 0 },
      { tType: TType.VALUE, tValue: 'hotdog', index: 1 },
      { tType: TType.EOL, tValue: '', index: 2 },
    ]
    expect(tokenize(mock)).toStrictEqual(mockOut)
  })
  test('single flag, with spaced data', () => {
    const mock = '-x hotdog bun'.split(' ')
    const mockOut = [
      { tType: TType.SINGLE, tValue: 'x', index: 0 },
      { tType: TType.VALUE, tValue: 'hotdog bun', index: 1 },
      { tType: TType.EOL, tValue: '', index: 3 },
    ]
    expect(tokenize(mock)).toStrictEqual(mockOut)
  })
  test('single flag, with multi-spaced data', () => {
    const mock = '-x hotdog and hamburger bun'.split(' ')
    const mockOut = [
      { tType: TType.SINGLE, tValue: 'x', index: 0 },
      {
        tType: TType.VALUE,
        tValue: 'hotdog and hamburger bun',
        index: 1,
      },
      { tType: TType.EOL, tValue: '', index: 5 },
    ]
    expect(tokenize(mock)).toStrictEqual(mockOut)
  })
  test('two flags, no data', () => {
    const mock = '-x -y'.split(' ')
    const mockOut = [
      { tType: TType.SINGLE, tValue: 'x', index: 0 },
      { tType: TType.SINGLE, tValue: 'y', index: 1 },
      { tType: TType.EOL, tValue: '', index: 2 },
    ]
    expect(tokenize(mock)).toStrictEqual(mockOut)
  })
  test('two flags, with data', () => {
    const mock = '-x hotdog -y bun'.split(' ')
    const mockOut = [
      { tType: TType.SINGLE, tValue: 'x', index: 0 },
      { tType: TType.VALUE, tValue: 'hotdog', index: 1 },
      { tType: TType.SINGLE, tValue: 'y', index: 2 },
      { tType: TType.VALUE, tValue: 'bun', index: 3 },
      { tType: TType.EOL, tValue: '', index: 4 },
    ]
    expect(tokenize(mock)).toStrictEqual(mockOut)
  })
  test('two flags, with spaced data', () => {
    const mock = '-x hotdog bun -y white noise'.split(' ')
    const mockOut = [
      { tType: TType.SINGLE, tValue: 'x', index: 0 },
      { tType: TType.VALUE, tValue: 'hotdog bun', index: 1 },
      { tType: TType.SINGLE, tValue: 'y', index: 3 },
      { tType: TType.VALUE, tValue: 'white noise', index: 4 },
      { tType: TType.EOL, tValue: '', index: 6 },
    ]
    expect(tokenize(mock)).toStrictEqual(mockOut)
  })
  test('two flags combined, no data', () => {
    const mock = ['-xy']
    const mockOut = [
      { tType: TType.SINGLE, tValue: 'xy', index: 0 },
      { tType: TType.EOL, tValue: '', index: 1 },
    ]
    expect(tokenize(mock)).toStrictEqual(mockOut)
  })
  test('two flags combined, with data', () => {
    const mock = '-xy word'.split(' ')
    const mockOut = [
      { tType: TType.SINGLE, tValue: 'xy', index: 0 },
      { tType: TType.VALUE, tValue: 'word', index: 1 },
      { tType: TType.EOL, tValue: '', index: 2 },
    ]
    expect(tokenize(mock)).toStrictEqual(mockOut)
  })
  test('large flag, no data', () => {
    const mock = ['--xy']
    const mockOut = [
      { tType: TType.DOUBLE, tValue: 'xy', index: 0 },
      { tType: TType.EOL, tValue: '', index: 1 },
    ]
    expect(tokenize(mock)).toStrictEqual(mockOut)
  })
  test('large flag, with data', () => {
    const mock = '--xy cat'.split(' ')
    const mockOut = [
      { tType: TType.DOUBLE, tValue: 'xy', index: 0 },
      { tType: TType.VALUE, tValue: 'cat', index: 1 },
      { tType: TType.EOL, tValue: '', index: 2 },
    ]
    expect(tokenize(mock)).toStrictEqual(mockOut)
  })
  test('small flag, large flag, no data', () => {
    const mock = '-a --xy'.split(' ')
    const mockOut = [
      { tType: TType.SINGLE, tValue: 'a', index: 0 },
      { tType: TType.DOUBLE, tValue: 'xy', index: 1 },
      { tType: TType.EOL, tValue: '', index: 2 },
    ]
    expect(tokenize(mock)).toStrictEqual(mockOut)
  })
  test('small flag, with data large flag, with data', () => {
    const mock = '-a horse --xy scooter'.split(' ')
    const mockOut = [
      { tType: TType.SINGLE, tValue: 'a', index: 0 },
      { tType: TType.VALUE, tValue: 'horse', index: 1 },
      { tType: TType.DOUBLE, tValue: 'xy', index: 2 },
      { tType: TType.VALUE, tValue: 'scooter', index: 3 },
      { tType: TType.EOL, tValue: '', index: 4 },
    ]
    expect(tokenize(mock)).toStrictEqual(mockOut)
  })
  test('small flag, with data large flag, with spaced data', () => {
    const mock = '-a horse girl --xy scooter'.split(' ')
    const mockOut = [
      { tType: TType.SINGLE, tValue: 'a', index: 0 },
      { tType: TType.VALUE, tValue: 'horse girl', index: 1 },
      { tType: TType.DOUBLE, tValue: 'xy', index: 3 },
      { tType: TType.VALUE, tValue: 'scooter', index: 4 },
      { tType: TType.EOL, tValue: '', index: 5 },
    ]
    expect(tokenize(mock)).toStrictEqual(mockOut)
  })
})
