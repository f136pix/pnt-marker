import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import SignToken from '@/pages/api/auth/service/signToken';
import axios from 'axios';

export const authOptions: any = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/home', // signin page
    signOut: '/auth/signout', // on signout redirects to page
    error: '/auth/error', // displays authentication errors
    newUser: '/auth/new-user', // redirect here in new user case
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      const response = await axios.post(
        // checking if user exists
        'http://localhost:3000/api/auth/service/userExists',
        { email: profile.email }
      );
      if (response && response.data?.value === true) {
        return true;
      } else {
        // if user doesnt exists in our server, sign him to our db
        const data = {
          name: profile.given_name + ' ' + profile.family_name,
          email: profile.email,
          profileUrl: profile.picture,
        };
        const response = await axios.post(
          'http://localhost:3000/api/auth/service/registerUser',
          data
        );
        return true;
      }
    },
    async jwt({ token, user, account }) {
      if (account) {
        const userLoggedIn = await SignToken(user?.email as string);
        token.loggedUser = userLoggedIn;
      }
      return token;
    },
    async session({ session, token, user }) {
      // appending the token to NextAuth section provider
      session.loggedUser = token.loggedUser;
      return session;
    },
  },
};

export default NextAuth(authOptions);
