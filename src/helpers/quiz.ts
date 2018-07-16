import {get as getFromLocalStorage} from '../helpers/local-storage'

export const createLocalStorageKey = (key: string) => `quiz:${key}`

export const entEmailKey = createLocalStorageKey('entEmail')
export const selRecencyKey = createLocalStorageKey('selRecency')
export const selReligionKey = createLocalStorageKey('selReligion')
export const selStateKey = createLocalStorageKey('selState')

export const didFinishQuiz = () => !!(
  getFromLocalStorage(entEmailKey) && getFromLocalStorage(selStateKey) && getFromLocalStorage(selReligionKey) && getFromLocalStorage(selRecencyKey)
)