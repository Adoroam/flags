export enum TType {
  EOL = -1,
  VALUE = 0,
  SINGLE = 1,
  DOUBLE = 2,
}
export type TokenMap = (word: string, i: number) => Token

export type Token = {
  tType: TType
  tValue: string
  index: number
}
