import "server-only"
// "use client"

import type { NextPage } from "next";
import CategoryContainer from "../../Components/categoryPage/categoryContainer";
import { CategoriesType } from "../../Stores/itemDataStore";
import { redirect } from "next/navigation";

interface Props {
    categorySlug: CategoriesType
}

const Page = ({ params }: { params: Props }) => {

    const checkingType: CategoriesType[] = ["rings", "bracelets", "earrings", "necklaces"]

    if (!checkingType.includes(params.categorySlug)) {
        redirect("./404")
    }

    return (
        <CategoryContainer category={params.categorySlug} />
    )
}

export default Page