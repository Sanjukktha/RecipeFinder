import NextAuth, { type AuthOptions, type SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";
import clientPromise from "../../../lib/mongodbClient"; // adjust if you have a different Mongo client file

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    /**
     * Attach the user ID to the session so it can be accessed as session.user.id
     */
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      if (token?.sub && session.user) {
        session.user.id = token.sub; // ✅ adds userId for later use
      }
      return session;
    },

    /**
     * Customize JWT payload to store user info
     */
    async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
      if (user) token.sub = user.id;
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
