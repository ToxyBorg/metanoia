import "server-only"

import ContextWrapper from "../Context"
import { bodyColors } from "../Shared/colors"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body
        style={{ background: bodyColors.bodyPageColorLight, color: bodyColors.bodyTextColorLight }}
      >
        <ContextWrapper>
          {children}
        </ContextWrapper>
      </body>

    </html>
  )
}
