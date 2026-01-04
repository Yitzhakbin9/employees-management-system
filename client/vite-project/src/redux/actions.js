const doAddProduct = (product) => {
  return { type: 'ADD', payload: product };
};

const doRemoveProduct = (serialNo) => {
  return { type: 'REMOVE', payload: serialNo };
};

export { doAddProduct, doRemoveProduct };
