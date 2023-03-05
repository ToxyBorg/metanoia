import "server-only"
// "use client"

import type { NextPage } from "next";
import { redirect } from "next/navigation";
import SingleItemContainer from "../../../Components/SingleItemPage/SingleItemContainer";

interface Props {
    itemIdSlug: string
}

const Page = ({ params }: { params: Props }) => {

    // if (!checkingType.includes(params.categorySlug)) {
    //     redirect("./404")
    // }

    return (
        <SingleItemContainer itemID={params.itemIdSlug} />
    )
}

export default Page