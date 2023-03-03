// "use client"
import type { NextPage } from "next";
import Link from "next/link";
import { bodyColors } from "../Shared/colors";
import styles from "../Shared/css/styles.module.css";

const Custom404: NextPage = () => {
    return (

        <body
            style={{
                width: "100%", height: "100%",
                overflowX: "hidden",

                // display: "flex",
                // alignItems: "center",
                // justifyContent: "center",

                backgroundImage: bodyColors.bodyPageGradientLight,

                backgroundSize: "300% 300%",
                animation: `${styles.AnimateBG} 7s ease infinite`,

                color: bodyColors.bodyTextColorLight,
            }}
            className={styles.HiddenScrollBar}

        >
            <h1>404 - Page Not Found</h1>
            <button>
                <Link href={"/"}>
                    Head back home
                </Link>
            </button>

        </body>
    )
}

export default Custom404