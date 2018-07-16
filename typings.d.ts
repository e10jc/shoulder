declare var graphql: (string) => any

interface GArray<T> {
  edges: {
    node: T,
  }[],
}

interface Window {
  _learnq: any,
}

declare module '*.json' {
  const value: any
  export default value
}