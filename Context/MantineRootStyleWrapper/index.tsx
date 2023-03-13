"use client";

import { CacheProvider } from '@emotion/react';
import { useEmotionCache, MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { useIntersection, useMouse, useScrollIntoView } from '@mantine/hooks';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter, useServerInsertedHTML } from 'next/navigation';
import { useRef, useState } from 'react';
import { bodyColors } from '../../Shared/colors';
import cx from 'classnames';

// import { containerRefAtom, refDataAtom } from '../../Stores/heroOutOfViewStore';
import { screenSizesAtom } from '../../Stores/screenSizesStore';
import { windowScrollDirectionAtom } from '../../Stores/windowScrollStore';
import { Notifications } from '@mantine/notifications';
import style from '../../Shared/css/style';
import { cartItemsDataAtom, cartType } from '../../Stores/cartStore';
import { adminAddItemAtom, adminAddItemType } from '../../Stores/adminAddItemStore';
import { useSupabase } from '../SupabaseWrapper/supabase-provider';
import { currentSessionUserIsAdmin } from '../../Stores/adminSpecialButtonsStore';
import { routerPushToMainPageAtom } from '../../Stores/lastStepStore';



export default function MantineRootStyleWrapper({ children }: { children: React.ReactNode }) {
    const cache = useEmotionCache();
    cache.compat = true;

    useServerInsertedHTML(() => (
        <style
            data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
            dangerouslySetInnerHTML={{
                __html: Object.values(cache.inserted).join(' '),
            }}
        />
    ));


    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

    const toggleColorScheme = () => {
        setColorScheme(colorScheme === "dark" ? "light" : "dark");

        // document.body.className = styles.Animated_Background_Gradient;
        // document.body.className = cx(styles.Animated_Background_Gradient, styles.HiddenScrollBar)

        document.body.style.width = "100%"
        document.body.style.height = "100%"



        document.body.style.backgroundImage =
            colorScheme === "dark"
                ? bodyColors.bodyPageGradientLight
                : bodyColors.bodyPageGradientDark;

        document.body.style.backgroundSize = "300% 300%";
        document.body.style.animation = `${style.AnimateBG} 7s ease infinite`;

        document.body.style.color =
            colorScheme === "dark"
                ? bodyColors.bodyTextColorLight
                : bodyColors.bodyTextColorDark;
    };


    // const { ref: mousePosRef, x, y } = useMouse();
    // const xMousePosSetter = useSetAtom(xMousePosAtom)
    // xMousePosSetter({ xMousePosRef: mousePosRef, x: x })


    // const containerRefSetter = useSetAtom(containerRefAtom)
    // containerRefSetter(useRef())

    // const { ref, entry } = useIntersection({
    //     root: useAtomValue(containerRefAtom)?.current,
    //     threshold: 0.5,
    // });

    // const refDataSetter = useSetAtom(refDataAtom)
    // refDataSetter({ ref: ref, entry: entry })

    const { supabase, } = useSupabase()

    const currentSessionUserIsAdminSetter = useSetAtom(currentSessionUserIsAdmin)
    const handleUserIsAdmin = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        // getSession().session.user

        if (user !== null) {
            if (process.env.NEXT_PUBLIC_ADMIN_EMAILS) {

                const LIST = JSON.parse(process.env.NEXT_PUBLIC_ADMIN_EMAILS);

                if (Array.isArray(LIST)) {
                    if (LIST.includes(user.email)) {
                        currentSessionUserIsAdminSetter(true)
                    }
                }
            }
        } else {
            currentSessionUserIsAdminSetter(false)
        }
    }
    handleUserIsAdmin()


    const screenSizesSetter = useSetAtom(screenSizesAtom)
    screenSizesSetter()

    const windowScrollDirectionSetter = useSetAtom(windowScrollDirectionAtom)
    windowScrollDirectionSetter()


    const cartItemsDataAtomSetter = useSetAtom(cartItemsDataAtom)
    const adminAddItemAtomSetter = useSetAtom(adminAddItemAtom)

    if (typeof window !== "undefined") {

        const cart_data = window.localStorage.getItem('cart')
        if (cart_data != null) {
            cartItemsDataAtomSetter(JSON.parse(cart_data))
        }
        const admin_item_data = window.localStorage.getItem('admin_item_added')
        if (admin_item_data != null) {
            const adminData: adminAddItemType = JSON.parse(admin_item_data)
            adminAddItemAtomSetter(adminData)
        }

    }

    const routerPushToMainPageAtomSetter = useSetAtom(routerPushToMainPageAtom)
    const router = useRouter();
    routerPushToMainPageAtomSetter(router)

    return (
        <CacheProvider value={cache}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider withGlobalStyles withNormalizeCSS withCSSVariables
                    theme={{
                        colorScheme: colorScheme,
                        // breakpoints: {

                        //     xs: 376,
                        //     sm: 426,
                        //     md: 787,
                        //     lg: 900,
                        //     xl: 1440,
                        // },
                    }}>

                    <Notifications limit={2} />
                    {children}
                </MantineProvider>
            </ColorSchemeProvider>
        </CacheProvider>
    );
}