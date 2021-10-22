const disableClassName = 'ad-form--disabled';

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');

const adFormNodes = Array.from(adForm.children);
const filterFormNodes = Array.from(filterForm.children);
const formNodes = adFormNodes.concat(filterFormNodes);

const addClassName = (node, className) => {
  node.classList.add(className);
};

const removeClassName = (node, className) => {
  node.classList.remove(className);
};

const deactivateForm = () => {
  addClassName(adForm, disableClassName);
  addClassName(filterForm, disableClassName);
  formNodes.forEach((node) => node.setAttribute('disabled', ''));
};

const activateForm = () => {
  removeClassName(adForm, disableClassName);
  removeClassName(filterForm, disableClassName);
  formNodes.forEach((node) => node.removeAttribute('disabled'));
};

export { deactivateForm, activateForm };
