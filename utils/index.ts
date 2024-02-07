import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';
import axios from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function decodeToken(token: string) {
  const decodedJwt = await jwt.decode(
    token,
    process.env.NEXT_PUBLIC_JWT_SECRET_KEY
  );
  return decodedJwt;
}

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const postFetcher = (url: string, data: any) =>
  axios.post(url, data).then((res) => res.data);

