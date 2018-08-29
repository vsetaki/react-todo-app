import { remove } from 'ramda';
import { getLocalStorageItem, setLocalStorageItem } from '../utils';
import { API_DELAY } from '../constants';

function deleteTask(id) {
  const tasks = getLocalStorageItem();
  let newState = [];

  if (tasks && Array.isArray(tasks)) {
    const userIndex = tasks.findIndex(item => item.id === id);
    newState = remove(userIndex, 1, tasks);
  }

  setLocalStorageItem(newState);

  return new Promise((resolve) => {
    setTimeout(() => resolve(newState), API_DELAY);
  });
}

export default deleteTask;
