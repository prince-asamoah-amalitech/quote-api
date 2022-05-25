const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const getElementByIndex = (index, arr) => {
  if (!arr) throw new Error('Expected an array');
  if (!index) throw new Error("Expected an id");
  return arr.findIndex(elem => elem.id === Number(index));
}

const updateElement = (index, array, updateElement) => {
  array[index] = updateElement;
}

const addElement = (array, addElement) => {

}

module.exports = {
  getRandomElement,
  getElementByIndex,
  updateElement
};
