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
