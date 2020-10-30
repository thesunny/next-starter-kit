# next-auth

## Getting Started

### Add Packages

```sh
yarn add next-auth
yarn add @types/next-auth --dev
```

### Setup Environment Variables

Copy `.env.development` from the `next-auth-demo` project into your project or add it to `.env.development` if it already exists.

Change the `DATABASE_URL` to point to the port you specified when setting up your database in `readme/database.md` which you will find at `config/postgres/docker-compose.yaml`

```sh
# Change `xxxx` to the port you specified
DATABASE_URL=postgres://postgres:my-password@127.0.0.1:xxxx/postgres
```

### Create this file to setup an API endpoint for authentication

```ts
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
```

### Create this file for a basic auth page

```tsx
// pages/auth.tsx
import React from "react"
import { GetServerSidePropsContext } from "next"
import { getSession, signIn, signOut, useSession } from "next-auth/client"
import NextRouter from "next/router"

export default function Page() {
  const [session, loading] = useSession()

  function onSignOut() {
    signOut({ callbackUrl: window.location.href })
    NextRouter.reload()
  }

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          {session.user.image ? (
            <img
              src={session.user.image}
              style={{ width: 32, height: 32, borderRadius: 16 }}
            />
          ) : null}
          <button onClick={onSignOut}>Sign out</button>
        </>
      )}
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  return {
    props: { session },
  }
}
```
