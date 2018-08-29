import { update as updateArray } from 'ramda';
import { getLocalStorageItem, setLocalStorageItem } from '../utils';
import { API_DELAY } from '../constants';

function update(id, data) {
  const tasks = getLocalStorageItem();
  let newState = [];

  if (tasks && Array.isArray(tasks)) {
    const userIndex = tasks.findIndex(item => item.id === id);
    tasks[userIndex] = { id, ...data };
    newState = updateArray(userIndex, { id, ...data }, tasks);
  }

  setLocalStorageItem(newState);

  return new Promise((resolve) => {
    setTimeout(() => resolve(newState), API_DELAY);
  });
}

export default update;
