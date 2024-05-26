const findClassesOccurances = () => {
  const classesMap = new Map();

  const traverseDom = (node) => {
    // take its class, add to set
    /* const classname = node.className; */
    const classnames = node.classList;
    if (classnames && classnames.length) {
      [...classnames].forEach((classname) => {
        if (classname && classesMap.has(classname)) {
          const n = classesMap.get(classname);
          classesMap.set(node.className, n + 1);
        } else classesMap.set(node.className, 1);
      });
    }

    // check children
    const children = [...node.childNodes];
    // run traverse for children
    if (children) {
      children.forEach((child) => traverseDom(child));
    }
  };

  traverseDom(document);

  const sortedMap = [...classesMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .splice(0, 10);

  return sortedMap;
};

const findClassesOccurances = () => {
  const classesMap = new Map();
  let stack = [document];

  while (stack.length) {
    const node = stack.pop();
    /*     console.log(stack) */
    const classnames = node.classList;
    if (classnames && classnames.length) {
      [...classnames].forEach((classname) => {
        if (classname && classesMap.has(classname)) {
          const n = classesMap.get(classname);
          classesMap.set(node.className, n + 1);
        } else classesMap.set(node.className, 1);
      });
    }
    const children = [...node.childNodes];
    /*     console.log({children}) */
    if (children.length) stack = [...stack, ...children];
  }

  const sortedMap = [...classesMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .splice(0, 10);

  return sortedMap;
};

console.log(findClassesOccurances());

console.log(findClassesOccurances());
