"use client";

import { CacheProvider } from '@emotion/react';
import { useEmotionCache, MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { useAtomValue, useSetAtom } from 'jotai';
import { useServerInsertedHTML } from 'next/navigation';
import { useRef, useState } from 'react';
import { bodyColors } from '../../Shared/colors';
import { containerRefAtom, refDataAtom } from '../../Stores/heroOutOfViewStore';


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
        document.body.style.background =
            colorScheme === "dark"
                ? bodyColors.bodyPageColorLight
                : bodyColors.bodyPageColorDark;

        document.body.style.color =
            colorScheme === "dark"
                ? bodyColors.bodyTextColorLight
                : bodyColors.bodyTextColorDark;
    };

    // const containerRefSetter = useSetAtom(containerRefAtom)
    // containerRefSetter(useRef())

    // const { ref, entry } = useIntersection({
    //     root: useAtomValue(containerRefAtom)?.current,
    //     threshold: 0,
    // });

    // const refDataSetter = useSetAtom(refDataAtom)
    // refDataSetter({ ref: ref, entry: entry })


    return (
        <CacheProvider value={cache}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider withGlobalStyles withNormalizeCSS withCSSVariables
                    theme={{
                        colorScheme: colorScheme,
                        breakpoints: {

                            // xs: 576,
                            // sm: 768,
                            // md: 992,
                            // lg: 1200,
                            // xl: 1400

                            xs: 376,
                            sm: 426,
                            md: 787,
                            lg: 900,
                            xl: 1440,
                        },
                    }}>
                    {children}
                </MantineProvider>
            </ColorSchemeProvider>
        </CacheProvider>
    );
}