/*
 * Traverses up an element's parent(s) until it finds 'node'.
 */
export const isNodeInRoot = (node: HTMLElement, root: HTMLElement) => {
  let currentNode: HTMLElement = node;

  while (currentNode) {
    if (currentNode === root) {
      return true;
    }
    currentNode = currentNode.parentNode as HTMLElement;
  }

  return false;
};
