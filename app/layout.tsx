import "server-only"

import ContextWrapper from "../Context"
import { bodyColors } from "../Shared/colors"
// import SupabaseListener from '../Context/SupabaseWrapper/supabase-listener'
// import SupabaseProvider from '../Context/SupabaseWrapper//supabase-provider'
// import { createClient } from '../services/supabase/utils/supabase-server'

// do not cache this layout
// export const revalidate = 120

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // const supabase = createClient()

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession()

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body
        style={{
          // backgroundImage: bodyColors.bodyPageGradientLight,
          background: bodyColors.bodyPageColorLight,
          color: bodyColors.bodyTextColorLight
        }}
      >
        {/* <SupabaseProvider> */}
        {/* <SupabaseListener serverAccessToken={session?.access_token} /> */}
        <ContextWrapper>
          {children}
        </ContextWrapper>
        {/* </SupabaseProvider> */}


      </body>

    </html>
  )
}