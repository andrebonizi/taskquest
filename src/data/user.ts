import type { UserInfo } from 'firebase/auth';

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
