import "server-only"

import { createClient } from '../services/supabase/utils/supabase-server'
import TextMantine from "../Components/test_components/TextMantine";
import ResponsiveItemCards from "../Components/ResponsiveItemsContainer";
import HeroSection from "../Components/MainPage/HeroSection";

// do not cache this page
// export const revalidate = 120

export default async function Home() {
  // const supabase = createClient()
  // const { data } = await supabase.from('posts').select('*')
  // const { data } = await supabase.from('Items').select("*")

  return (
    <>

      {/* <p>
        {JSON.stringify({ data }, null, 2)}
      </p> */}
      {/* <TextMantine data={data} /> */}
      <HeroSection />
      <ResponsiveItemCards />
    </>
  )
}
