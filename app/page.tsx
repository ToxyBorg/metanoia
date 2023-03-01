import "server-only"

import { createClient } from '../services/supabase/utils/supabase-server'
// import TextMantine from "../Components/test_components/TextMantine";
import ResponsiveItemsContainer from "../Components/ResponsiveItemsContainer/ResponsiveItemsContainer";
import HeroSection from "../Components/MainPage/HeroSection";
import { bracelets, earrings, necklaces, rings } from "../Shared/icons";

// do not cache this page
// export const revalidate = 120

export default async function Home() {
  // const supabase = createClient()
  // const { data: ringsData, error: ringsError } = await supabase.from('rings').select("*")
  // const { data: braceletsData, error: braceletsError } = await supabase.from('bracelets').select("*")
  // const { data: necklacesData, error: necklacesError } = await supabase.from('necklaces').select("*")
  // const { data: earringsData, error: earringsError } = await supabase.from('earrings').select("*")

  return (
    <>
      <HeroSection />
      {/* {ringsError || braceletsError || necklacesError || earringsError ? null : <ResponsiveItemsContainer AllItemsData={
        {
          "rings": { data: ringsData, icon: rings },
          "bracelets": { data: braceletsData, icon: bracelets },
          "necklaces": { data: necklacesData, icon: necklaces },
          "earrings": { data: earringsData, icon: earrings },
        }} />} */}

      <ResponsiveItemsContainer />
    </>
  )
}
