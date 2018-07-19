declare var graphql: (string) => any

interface GArray<T> {
  edges: {
    node: T,
  }[],
}

interface Meta {
  description: string,
  image: {
    title: string,
    file: {
      url: string,
    },
  },
  title: string,
}

interface Window {
  _learnq: any,
}

declare module '*.json' {
  const value: any
  export default value
}