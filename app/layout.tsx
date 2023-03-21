import "server-only"

import cx from 'classnames';

import ContextWrapper from "../Context/ContextWrapper"
import { bodyColors } from "../Shared/colors"
import SupabaseListener from '../Context/SupabaseWrapper/supabase-listener'
import SupabaseProvider from '../Context/SupabaseWrapper//supabase-provider'
import { createClient } from '../services/supabase/utils/supabase-server'
import { rings, bracelets, necklaces, earrings } from "../Shared/icons";
import { AllItemsData } from "../Stores/itemDataStore";
import style from "../Shared/css/style";

// do not cache this layout
export const revalidate = 60
export const dynamic = 'force-dynamic'

// Static metadata
export const metadata = {
  title: "Shop Metanoia",
  viewport: {
    width: "device-width",
    initialScale: 1
  },
  description: "Metanoia online store. Website made by ToxyBorg (Amir)",
  icons: {
    icon: "/favicon.ico"
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: allItems_data, error } = await supabase.from('all_items').select("*").order('created_at', { ascending: false })
  const {
    data: { session },
  } = await supabase.auth.getSession()


  // console.log("DATA: ", allItems_data)

  return (
    <html lang="en">

      {/* <head /> */}

      <body
        style={{
          width: "100%", height: "100%",
          overflowX: "hidden",

          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",

          backgroundImage: bodyColors.bodyPageGradientLight,

          backgroundSize: "300% 300%",
          animation: `${style.AnimateBG} 7s ease infinite`,

          color: bodyColors.bodyTextColorLight,
        }}
        className={style.HiddenScrollBar}

      >
        <SupabaseProvider>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <ContextWrapper AllItemsData={error ? [] : allItems_data}>
            {children}
          </ContextWrapper>
        </SupabaseProvider>


      </body>

    </html >
  )
}

//////////////////////////////////////////////////////////////////

// const error = false;
// const allItems_data: AllItemsData = [
//   {
//     category: "rings",
//     created_at: "16:33",
//     description: "Test description Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum quae recusandae quos? Ipsa veritatis quo fugit eveniet itaque quasi tempora",
//     item_id: "randID451785475",
//     mainImageURL: "https://picsum.photos/id/1/400/600",
//     price: 5447,
//     secondaryImagesURLS: [
//       "https://picsum.photos/id/2/400/600",
//       "https://picsum.photos/id/3/400/600",
//       "https://picsum.photos/id/4/400/600"
//     ],
//     stock: 12,
//     tags: [
//       "amethyst",
//       "other weird rock",
//       "red rock or something"
//     ],
//     title: "Test product title"
//   },
//   {
//     category: "bracelets",
//     created_at: "16:33",
//     description: "Test description Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum quae recusandae quos? Ipsa veritatis quo fugit eveniet itaque quasi tempora",
//     item_id: "randID451785754",
//     mainImageURL: "https://picsum.photos/id/8/400/600",
//     price: 5487,
//     secondaryImagesURLS: [
//       "https://picsum.photos/id/38/400/600",
//       "https://picsum.photos/id/45/400/600",
//       "https://picsum.photos/id/15/400/600"
//     ],
//     stock: 15,
//     tags: [
//       "yo mama",
//       "other weird rock",
//       "red rock or something"
//     ],
//     title: "Longer Test product title with lots of new words"
//   },
//   {
//     category: "earrings",
//     created_at: "16:33",
//     description: "Test description 2. Rerum quae recusandae quos? Ipsa veritatis quo fugit eveniet itaque quasi tempora",
//     item_id: "randID451787154",
//     mainImageURL: "https://picsum.photos/id/110/400/600",
//     price: 1050,
//     secondaryImagesURLS: [
//       "https://picsum.photos/id/265/400/600",
//       "https://picsum.photos/id/119/400/600",
//       "https://picsum.photos/id/281/400/600"
//     ],
//     stock: 10,
//     tags: [
//       "red amethyst",
//       "blue rock",
//       "test tag"
//     ],
//     title: "small title"
//   },
//   {
//     category: "earrings",
//     created_at: "16:33",
//     description: "Test description 2. Rerum quae recusandae quos? Ipsa veritatis quo fugit eveniet itaque quasi tempora",
//     item_id: "randID45178hbj4",
//     mainImageURL: "https://picsum.photos/id/70/400/600",
//     price: 1050,
//     secondaryImagesURLS: [
//       "https://picsum.photos/id/71/400/600"
//     ],
//     stock: 10,
//     tags: [
//       "red amethyst",
//       "blue rock",
//       "test tag"
//     ],
//     title: "small title"
//   },
//   {
//     category: "earrings",
//     created_at: "16:33",
//     description: "Test description 2. Rerum quae recusandae quos? Ipsa veritatis quo fugit eveniet itaque quasi tempora",
//     item_id: "randID4517dtd87154",
//     mainImageURL: "https://picsum.photos/id/200/400/600",
//     price: 1050,
//     secondaryImagesURLS: [
//       "https://picsum.photos/id/132/400/600",
//       "https://picsum.photos/id/211/400/600"
//     ],
//     stock: 10,
//     tags: [
//       "red amethyst",
//       "blue rock",
//       "test tag"
//     ],
//     title: "small title"
//   },
//   {
//     category: "necklaces",
//     created_at: "16:33",
//     description: "Test description 2. Rerum quae recusandae quos? Ipsa veritatis quo fugit eveniet itaque quasi tempora",
//     item_id: "randID45178747hu154",
//     mainImageURL: "https://picsum.photos/id/170/400/600",
//     price: 9050,
//     secondaryImagesURLS: [
//       "https://picsum.photos/id/175/400/600",
//       "https://picsum.photos/id/171/400/600"
//     ],
//     stock: 5,
//     tags: [
//       "red amethyst",
//       "blue rock",
//       "test tag"
//     ],
//     title: "small title"
//   }
// ]

