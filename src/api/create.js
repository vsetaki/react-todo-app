import { append } from 'ramda';
import { getLocalStorageItem, setLocalStorageItem } from '../utils';
import { API_DELAY } from '../constants';

function create(data) {
  const tasks = getLocalStorageItem();
  const lastItem = Array.isArray(tasks) ? tasks.slice(-1).pop() : { id: 0 };
  const nextId = (lastItem && lastItem.id + 1) || 1;
  const newState = append({ id: nextId, ...data }, tasks || []);

  setLocalStorageItem(newState);

  return new Promise((resolve) => {
    setTimeout(() => resolve(newState), API_DELAY);
  });
}

export default create;
