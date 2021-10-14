import { chDashes, rmDashes, flags } from './index'

describe('chDashes', () => {
  test('no dashes', () => {
    expect(chDashes('apple')).toBe(0)
  })
  test('small flag', () => {
    expect(chDashes('-a')).toBe(1)
  })
  test('small multi-flag', () => {
    expect(chDashes('-ab')).toBe(1)
  })
  test('large flag', () => {
    expect(chDashes('--apple')).toBe(2)
  })
  test('large flag (multiple)', () => {
    expect(chDashes('---apple')).toBe(2)
  })
})
describe('rmDashes', () => {
  test('no dashes', () => {
    expect(rmDashes('apple')).toBe('apple')
  })
  test('small flag', () => {
    expect(rmDashes('-a')).toBe('a')
  })
  test('small flag caps', () => {
    expect(rmDashes('-A')).toBe('a')
  })
  test('small multi-flag', () => {
    expect(rmDashes('-ab')).toBe('ab')
  })
  test('small multi-flag caps', () => {
    expect(rmDashes('-AB')).toBe('ab')
  })
  test('large flag', () => {
    expect(rmDashes('--apple')).toBe('apple')
  })
  test('large flag caps', () => {
    expect(rmDashes('--Apple')).toBe('apple')
  })
  test('large flag (multiple)', () => {
    expect(rmDashes('---apple')).toBe('-apple')
  })
})

describe('flags', () => {
  test('blank object when no flags supplied', () => {
    expect(flags([])).toStrictEqual({})
  })
  test('blank object when only string', () => {
    const mock = 'string'.split(' ')
    expect(flags(mock)).toStrictEqual({})
  })
  test('blank object when only string with spaces', () => {
    const mock = 'test string'.split(' ')
    expect(flags(mock)).toStrictEqual({})
  })
  test('single flag, no data', () => {
    const mock=['-x']
    expect(flags(mock)).toStrictEqual({ x: 1 })
  })
  test('single flag, with data', () => {
    const mock = '-x hotdog'.split(' ')
    expect(flags(mock)).toStrictEqual({ x: 'hotdog' })
  })
  test('single flag, with spaced data', () => {
    const mock = '-x hotdog bun'.split(' ')
    expect(flags(mock)).toStrictEqual({ x: 'hotdog bun' })
  })
  test('two flags, no data', () => {
    const mock = '-x -y'.split(' ')
    expect(flags(mock)).toStrictEqual({ x: 1, y: 1 })
  })
  test('two flags, with data', () => {
    const mock = '-x hotdog -y bun'.split(' ')
    expect(flags(mock)).toStrictEqual({ x: 'hotdog', y: 'bun' })
  })
  test('two flags, with spaced data', () => {
    const mock = '-x hotdog bun -y white noise'.split(' ')
    expect(flags(mock)).toStrictEqual({ x: 'hotdog bun', y: 'white noise' })
  })
  test('two flags combined, no data', () => {
    const mock = ['-xy']
    expect(flags(mock)).toStrictEqual({ x: 1, y: 1 })
  })
  test('two flags combined, with data', () => {
    const mock = '-xy word'.split(' ')
    expect(flags(mock)).toStrictEqual({ x: 'word', y: 'word' })
  })
  test('large flag, no data', () => {
    const mock = ['--xy']
    expect(flags(mock)).toStrictEqual({ xy: 1 })
  })
  test('large flag, with data', () => {
    const mock = '--xy cat'.split(' ')
    expect(flags(mock)).toStrictEqual({ xy: 'cat' })
  })
  test('small flag, large flag, no data', () => {
    const mock = '-a --xy'.split(' ')
    expect(flags(mock)).toStrictEqual({ a: 1, xy: 1 })
  })
  test('small flag, with data large flag, with data', () => {
    const mock = '-a horse --xy scooter'.split(' ')
    expect(flags(mock)).toStrictEqual({ a: 'horse', xy: 'scooter' })
  })
  test('small flag, with data large flag, with spaced data', () => {
    const mock = '-a horse girl --xy scooter'.split(' ')
    expect(flags(mock)).toStrictEqual({ a: 'horse girl', xy: 'scooter' })
  })
})
