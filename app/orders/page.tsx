import "server-only"

import { redirect } from "next/navigation";

// import { useRouter } from "next/navigation";
import { createClient } from "../../services/supabase/utils/supabase-server";
import OrdersContainer from "../../Components/OrdersPage/OrdersContainer";

// do not cache this page
// export const revalidate = 60

const Page = async () => {

    const supabase = createClient()
    // const { data: allItems_data, error } = await supabase.from('all_items').select("*")
    const {
        data: { session },
    } = await supabase.auth.getSession()
    const { data: { user } } = await supabase.auth.getUser()


    if (session && user) {
        if (process.env.SERVER_ADMIN_EMAILS) {

            const LIST = JSON.parse(process.env.SERVER_ADMIN_EMAILS);

            if (Array.isArray(LIST)) {


                if (LIST.includes(user.email)) {
                    const { data: allOrders_data, error } = await supabase.from('orders').select("*").order('created_at', { ascending: false });

                    return (
                        <OrdersContainer OrderData={error ? [] : allOrders_data} />
                    )
                }
                else if (!LIST.includes(user.email)) {
                    redirect('/')
                }
            }
        }
        else {
            redirect('/')
        }
    }
    else {
        redirect('/')
    }
}

export default Page