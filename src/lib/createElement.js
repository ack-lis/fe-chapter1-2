//import { addEvent } from "./eventManager";

export function createElement(vNode) {
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();

    vNode.forEach((child) => {
      //   const childNode = createElement(child);
      //   fragment.appendChild(childNode);

      fragment.appendChild(createElement(child));
    });

    return fragment;
  }

  if (vNode === null || vNode === undefined || typeof vNode === "boolean") {
    return document.createTextNode("");
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(String(vNode));
  }

  if (typeof vNode === "object") {
    // 함수 컴포넌트면 일떄 처리
    // if (typeof vNode.type === "function") {
    //   throw new Error("Function components are not supported");
    // }

    // const $el = document.createElement(vNode.type);
    // return $el;

    const { type, props = {} } = vNode;
    const $el = document.createElement(type);

    // props 처리 (children 제외)
    updateAttributes($el, props);

    // children 처리
    const { children } = props;
    if (children !== undefined) {
      const childNodes = Array.isArray(children) ? children : [children];

      childNodes.forEach((child) => {
        $el.appendChild(createElement(child));
      });
    }

    return $el;
  }

  throw new Error("Unsupported vNode type");
}

function updateAttributes($el, props) {
  Object.entries(props).forEach(([key, value]) => {
    if (key === "children") return;

    if (key === "className") {
      $el.setAttribute("class", value);
      return;
    }

    $el.setAttribute(key, value);
  });
}
