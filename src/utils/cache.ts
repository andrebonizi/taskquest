import { LOCAL_FBUSER } from './constants';

export function getLocalUser(): string | null {
  return localStorage.getItem(LOCAL_FBUSER);
}

export function setLocalUser(fbUser = null): boolean {
  if (!fbUser) return false;

  localStorage.setItem(LOCAL_FBUSER, JSON.stringify(fbUser));
  return true;
}
