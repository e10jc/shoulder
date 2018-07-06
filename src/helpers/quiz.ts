import {get as getFromLocalStorage} from '../helpers/local-storage'

export const createLocalStorageKey = (key: string) => `quiz:${key}`

export const selRecencyKey = createLocalStorageKey('selRecency')
export const selReligionKey = createLocalStorageKey('selReligion')
export const selStateKey = createLocalStorageKey('selState')

export const didFinishQuiz = currentUser => !!(
  currentUser && getFromLocalStorage(selStateKey) && getFromLocalStorage(selReligionKey) && getFromLocalStorage(selRecencyKey)
)