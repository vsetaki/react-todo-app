import { LOCAL_STORAGE_NAME } from './constants';

export function getLocalStorageItem() {
  const item = localStorage.getItem(LOCAL_STORAGE_NAME);

  return item ? JSON.parse(item) : null;
}

export function setLocalStorageItem(value) {
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(value));
}
