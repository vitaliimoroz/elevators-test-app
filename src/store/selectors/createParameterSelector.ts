export const createParameterSelector = <T, R>(selector) => (_, params: T): R =>
  selector(params);
