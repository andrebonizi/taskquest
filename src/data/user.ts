import type { User, UserInfo } from 'firebase/auth';
import { LOCAL_FBUSER } from '../utils/constants';

export function imageValidation(imgSrc: string): boolean {
  const url = new URL(imgSrc);
  const img = new Image();
  img.src = url.href;
  return true;
}

export async function formatUser(user: UserInfo): Promise<any> {
  const imgSrc = imageValidation(user.photoURL);
  const formattedUser = {
    name: user.displayName,
    photoSrc: imgSrc,
    id: user.uid,
  };

  return formattedUser;
}

export function getFirstName(user: UserInfo): string {
  if (!user) return 'Unknown';
  return user.displayName.split(' ')[0];
}

export function setLocalUser(fbUser: User = null): void {
  if (!fbUser) return;

  localStorage.setItem(LOCAL_FBUSER, JSON.stringify(fbUser));
}
