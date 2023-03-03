import "server-only"

import { createClient } from '../services/supabase/utils/supabase-server'
// import TextMantine from "../Components/test_components/TextMantine";
import ResponsiveItemsContainer from "../Components/ResponsiveItemsContainer/ResponsiveItemsContainer";
import HeroSection from "../Components/MainPage/HeroSection";
import { bracelets, earrings, necklaces, rings } from "../Shared/icons";
import TestingModals from "../Components/test_components/TestingModals";

// do not cache this page
// export const revalidate = 120

export default async function Home() {

  return (
    <>
      <HeroSection />
      <ResponsiveItemsContainer />
      {/* <TestingModals /> */}
    </>
  )
}
