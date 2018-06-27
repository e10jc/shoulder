declare var graphql: (string) => any

interface GArray<T> {
  edges: {
    node: T,
  }[],
}

declare module '*.json' {
  const value: any
  export default value
}