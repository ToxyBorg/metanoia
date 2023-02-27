import "server-only"

import styles from "../Shared/css/styles.module.css"
import cx from 'classnames';

import ContextWrapper from "../Context"
import { bodyColors } from "../Shared/colors"
// import SupabaseListener from '../Context/SupabaseWrapper/supabase-listener'
// import SupabaseProvider from '../Context/SupabaseWrapper//supabase-provider'
// import { createClient } from '../services/supabase/utils/supabase-server'

// do not cache this layout
// export const revalidate = 120

// Static metadata
// export const metadata = {
//   title: "Shop Metanoia",
//   viewport: {
//     width: "device-width",
//     initialScale: 1
//   },
//   description: "Metanoia online store. Website made by ToxyBorg (Amir)",
//   icons: {
//     icon: "/favicon.ico"
//   }
// };


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

      <head />

      <body
        style={{
          // backgroundImage: bodyColors.bodyPageGradientLight,
          // background: bodyColors.bodyPageColorLight,
          width: "100%", height: "100%",
          overflowX: "hidden",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          // backgroundImage: bodyColors.bodyPageGradientLight,
          // background: bodyColors.bodyPageGradientLight,
          backgroundImage: bodyColors.bodyPageGradientLight,

          backgroundSize: "300% 300%",
          animation: `${styles.AnimateBG} 7s ease infinite`,

          color: bodyColors.bodyTextColorLight,
        }}
        className={styles.HiddenScrollBar}

      >
        {/* <SupabaseProvider> */}
        {/* <SupabaseListener serverAccessToken={session?.access_token} /> */}
        <ContextWrapper>
          {children}
        </ContextWrapper>
        {/* </SupabaseProvider> */}


      </body>

    </html >
  )
}