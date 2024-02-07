'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { decodeToken, fetcher } from '../../utils';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { IUser } from '@/types';

type decoded_token = {
  exp: number;
  iat: number;
  id: string;
};

type Props = {
  children?: React.ReactNode;
};

const INITIAL_STATE = {
  decoded_token: {
    exp: 0,
    iat: 0,
    id: '',
  },
  user: {
    id: 0,
    email: '',
    name: '',
    companyId: 0,
    profileUrl: '',
    role: 0,
  },
};

export function AuthProvider({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const [decoded_token, setDecoded_token] = useState<decoded_token>(
    INITIAL_STATE.decoded_token
  );
  const [userEmail, setUserEmail] = useState<string>();
  const [user, setUser] = useState<IUser>(INITIAL_STATE.user);
  const { data, error } = useSWR(`/api/user?email=${userEmail}`, fetcher);

  // making the decoded jwt information available
  const setToken = async () => {
    // @ts-ignore
    if (!session.data?.loggedUser) {
      return;
    }
    // @ts-ignore
    const decoded: decoded_token = await decodeToken(session.data.loggedUser);
    if (decoded) {
      setDecoded_token(decoded);
      return;
    }
  };

  const checkAuth = () => {
    if (session.status == 'authenticated') {
      if (pathname == '/OAuth/login' || pathname == '/OAuth/register') {
        router.push('/?logged=true');
      }
    }
    if (session.status == 'unauthenticated') {
      if (pathname !== '/OAuth/login' && pathname !== '/OAuth/register') {
        router.push('/OAuth/login?toast=true');
      }
    }
  };

  useEffect(() => {
    checkAuth();
    setToken();
  }, [pathname, session]);

  useEffect(() => {
    setUserEmail(decoded_token?.id);
  }, [decoded_token]);

  useEffect(() => {
    setUser(data?.data.user);
  }, [data]);

  const values = {
    decoded_token,
    user,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

const AuthContext = createContext(INITIAL_STATE);

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
