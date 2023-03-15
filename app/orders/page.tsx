import "server-only"
import { useSupabase } from "../../Context/SupabaseWrapper/supabase-provider";


const Page = async () => {

    const { supabase, } = useSupabase()

    const { data: { user } } = await supabase.auth.getUser()

    if (process.env.NEXT_PUBLIC_ADMIN_EMAILS) {

        const LIST = JSON.parse(process.env.NEXT_PUBLIC_ADMIN_EMAILS);

        if (user) {

            if (Array.isArray(LIST)) {


                if (LIST.includes(user.email)) {

                }
                else if (!LIST.includes(user.email)) {

                }
            }
        }

        // signInWithEmail()


    }
    else if (process.env.NEXT_PUBLIC_ADMIN_EMAILS == undefined) {

    }


    return (
        <>
        </>
    )
}

export default Page