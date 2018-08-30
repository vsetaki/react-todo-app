import { update as updateArray } from 'ramda';
import { getLocalStorageItem, setLocalStorageItem } from '../utils';
import { API_DELAY } from '../constants';

function update(id, data) {
  const tasks = getLocalStorageItem();
  let newState = [];

  if (tasks && Array.isArray(tasks)) {
    const index = tasks.findIndex(item => item.id === id);
    tasks[index] = { id, ...data };
    newState = updateArray(index, { id, ...data }, tasks);
  }

  setLocalStorageItem(newState);

  return new Promise((resolve) => {
    setTimeout(() => resolve(newState), API_DELAY);
  });
}

export default update;
