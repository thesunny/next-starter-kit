// pages/api/auth/[...nexauth].ts
import NextAuth, { InitOptions, User } from "next-auth"
import { SessionBase } from "next-auth/_utils"
import Providers from "next-auth/providers"
import { NextApiRequest, NextApiResponse } from "next"

const options: InitOptions = {
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.NEXT_AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_AUTH_GOOGLE_CLIENT_SECRET!,
    }),
    Providers.Cognito({
      clientId: process.env.NEXT_AUTH_COGNITO_CLIENT_ID!,
      clientSecret: process.env.NEXT_AUTH_COGNITO_CLIENT_SECRET!,
      domain: process.env.NEXT_AUTH_COGNITO_DOMAIN!,
    }),
    Providers.Email({
      server: process.env.NEXT_AUTH_EMAIL_SERVER!,
      from: process.env.NEXT_AUTH_EMAIL_FROM!,
    }),
  ],
  callbacks: {
    async session(session: SessionBase, user: User) {
      /**
       * This code adds the user id to the session so that we can access it
       * in the API.
       */
      ;(session.user as any).id = (user as any).id
      return session
    },
  },
  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
}

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)
