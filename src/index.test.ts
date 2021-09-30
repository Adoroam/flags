import { flags } from './index'

describe('flags', () => {
  test('blank object when no flags supplied', () => {
    expect(flags([])).toStrictEqual({})
  })
  test('single flag, no data', () => {
    const mock1=['-x']
    expect(flags(mock1)).toStrictEqual({ x: 1 })
  })
  test('single flag, with data', () => {
    const mock2 = '-x hotdog'.split(' ')
    expect(flags(mock2)).toStrictEqual({ x: 'hotdog' })
  })
  test('two flags, no data', () => {
    const mock3 = '-x -y'.split(' ')
    expect(flags(mock3)).toStrictEqual({ x: 1, y: 1 })
  })
  test('two flags, with data', () => {
    const mock4 = '-x hotdog -y bun'.split(' ')
    expect(flags(mock4)).toStrictEqual({ x: 'hotdog', y: 'bun' })
  })
  test('two flags combined, no data', () => {
    const mock5 = ['-xy']
    expect(flags(mock5)).toStrictEqual({ x: 1, y: 1 })
  })
  test('two flags combined, with data', () => {
    const mock6 = '-xy word'.split(' ')
    expect(flags(mock6)).toStrictEqual({ x: 'word', y: 'word' })
  })
  test('large flag, no data', () => {
    const mock7 = ['--xy']
    expect(flags(mock7)).toStrictEqual({ xy: 1 })
  })
  test('large flag, with data', () => {
    const mock8 = '--xy cat'.split(' ')
    expect(flags(mock8)).toStrictEqual({ xy: 'cat' })
  })
  test('small flag, large flag, no data', () => {
    const mock9 = '-a --xy'.split(' ')
    expect(flags(mock9)).toStrictEqual({ a: 1, xy: 1 })
  })
  test('small flag, with data large flag, with data', () => {
    const mock10 = '-a horse --xy scooter'.split(' ')
    expect(flags(mock10)).toStrictEqual({ a: 'horse', xy: 'scooter' })
  })
})
