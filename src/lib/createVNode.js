export function createVNode(type, props, ...children) {
  const normalizedChildren = children
    .flat(Infinity)
    .filter(
      (child) => child !== null && child !== undefined && child !== false,
    );
  // return {
  //   type,
  //   props,
  //   children,
  // };
  return {
    type,
    props: props ?? null,
    children: normalizedChildren,
  };
}
