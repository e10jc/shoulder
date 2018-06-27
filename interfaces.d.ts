declare var graphql: (string) => any

interface GArray<T> {
  edges: {
    node: T,
  }[],
}