"use client";

import { CacheProvider } from '@emotion/react';
import { useEmotionCache, MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { useIntersection, useMouse } from '@mantine/hooks';
import { useAtomValue, useSetAtom } from 'jotai';
import { useServerInsertedHTML } from 'next/navigation';
import { useRef, useState } from 'react';
import { bodyColors } from '../../Shared/colors';
import styles from "../../Shared/css/styles.module.css"
import { containerRefAtom, refDataAtom } from '../../Stores/heroOutOfViewStore';
import { xMousePosAtom } from '../../Stores/leftSideHover';
import { screenSizesAtom } from '../../Stores/screenSizesStore';
import { windowScrollDirectionAtom } from '../../Stores/windowScrollStore';



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

        document.body.className = styles.Animated_Background_Gradient;

        document.body.style.background =
            colorScheme === "dark"
                ? bodyColors.bodyPageGradientLight
                : bodyColors.bodyPageGradientDark;

        document.body.style.color =
            colorScheme === "dark"
                ? bodyColors.bodyTextColorLight
                : bodyColors.bodyTextColorDark;
    };


    const { ref: mousePosRef, x, y } = useMouse();
    const xMousePosSetter = useSetAtom(xMousePosAtom)
    xMousePosSetter({ xMousePosRef: mousePosRef, x: x })


    const containerRefSetter = useSetAtom(containerRefAtom)
    containerRefSetter(useRef())

    const { ref, entry } = useIntersection({
        root: useAtomValue(containerRefAtom)?.current,
        threshold: 0,
    });

    const refDataSetter = useSetAtom(refDataAtom)
    refDataSetter({ ref: ref, entry: entry })


    const screenSizesSetter = useSetAtom(screenSizesAtom)
    screenSizesSetter()

    const windowScrollDirectionSetter = useSetAtom(windowScrollDirectionAtom)
    windowScrollDirectionSetter()

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
                    {children}
                </MantineProvider>
            </ColorSchemeProvider>
        </CacheProvider>
    );
}