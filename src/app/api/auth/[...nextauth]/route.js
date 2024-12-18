import { get } from "lodash";
import NextAuth from "next-auth";
import { jwtDecode } from "jwt-decode";
import CredentialsProvider from "next-auth/providers/credentials";

import { authServices } from "@/services/authServices";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      authorize: async (credentials) => await authServices.verifyAccount(credentials),
    }),
  ],
  // session: { strategy: "jwt", maxAge: 24 * 60 * 60 },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.tokens = user.tokens;
      }

      // if (token) {
      //   const accessTokenDecoded = jwtDecode(token.tokens.accessToken);
      //   const refreshTokenDecoded = jwtDecode(token.tokens.refreshToken);

      //   const dateNow = Date.now() / 1000;
      //   console.log("🚀 ~ jwt ~ accessTokenDecoded:", accessTokenDecoded.exp)

      //   if (dateNow >= refreshTokenDecoded.exp) return null

      //   if (dateNow < accessTokenDecoded.exp) return token;
        
      //   const refreshToken = get(token, ["tokens", "refreshToken"])

      //   return authServices.refreshToken(refreshToken);
      // }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        session.tokens = token.tokens;
      }

      return session;
    },
  },

  secret: process.env.JWT_SECRET,
  cookies: {
    sessionToken: {
      name: "token",
      options: {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    csrfToken: {
      name: "csrf-token",
      options: {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    callbackUrl: {
      name: "callback-url",
      options: {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    pkceCodeVerifier: {
      name: "pkce-code-verifier",
      options: {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
