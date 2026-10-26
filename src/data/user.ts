import type { UserInfo } from 'firebase/auth';
import { LOCAL_FBUSER, NOBODY_FACE } from '../utils/constants';

export function getFirstName(user: UserInfo): string {
  if (!user?.displayName) return 'Unknown';

  return user.displayName.split(' ')[0];
}

export function getPhotoURL(user: UserInfo): string {
  if (!user?.photoURL) return NOBODY_FACE;

  return user.photoURL;
}

export function setLocalUser(user: UserInfo): void {
  if (!user) return;

  localStorage.setItem(LOCAL_FBUSER, JSON.stringify(user));
}
