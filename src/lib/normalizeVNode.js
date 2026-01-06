export function normalizeVNode(vNode) {
  if (vNode === null || vNode === undefined || typeof vNode === "boolean") {
    return "";
    // return null;
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    return String(vNode);
    // return node;
  }

  // 배열이면 재귀
  if (Array.isArray(vNode)) {
    return vNode.map(normalizeVNode).filter(Boolean);
  }

  // 함수 컴포넌트면 실행
  if (typeof vNode.type === "function") {
    return normalizeVNode(vNode.type(vNode.props));
  }

  // 일반 JSX 엘리먼트
  const { type, props } = vNode;
  const { children, ...rest } = props ?? {};

  return {
    type,
    props: {
      ...rest,
      children: normalizeVNode(children),
    },
  };

  // if (vNode.$$typeof === Symbol.for("react.element")) {
  //   // 함수 컴포넌트
  //   if (typeof vNode.type === "function") {
  //     return normalizeVNode(vNode.type(vNode.props));
  //   }

  //   // 일반 JSX 태그
  //   const { type, props } = vNode;
  //   const { children, ...rest } = props ?? {};

  //   return {
  //     type,
  //     props: {
  //       ...rest,
  //       children: normalizeVNode(children),
  //     },
  //   };
  // }

  // return vNode;
}
