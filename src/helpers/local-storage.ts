export const get = (key: string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key)
  } else {
    return null
  }
}

export const set = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.setItem(key, value)
  } else {
    return null
  }
}
