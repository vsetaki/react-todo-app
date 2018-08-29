import { getLocalStorageItem } from '../utils';
import { API_DELAY } from '../constants';

function read() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(getLocalStorageItem()), API_DELAY);
  });
}

export default read;
