import type { User, UserInfo } from 'firebase/auth';
import { LOCAL_FBUSER } from '../utils/constants';

async function imageValidation(imgSrc: string): Promise<string> {
  const res = await fetch(imgSrc);

  if (res.status === 200) {
    const img = new Image();
    img.src = imgSrc;
  }

  return imgSrc;
}

export async function formatUser(user: UserInfo): Promise<any> {
  const imgSrc = await imageValidation(user.photoURL);
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

export function getLocalUser(): string | null {
  return localStorage.getItem(LOCAL_FBUSER);
}

export function setLocalUser(fbUser: User = null): void {
  if (!fbUser) return;

  localStorage.setItem(LOCAL_FBUSER, JSON.stringify(fbUser));
}
