"use client";

import { CacheProvider } from '@emotion/react';
import { useEmotionCache, MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';
import { bodyColors } from '../../Shared/colors';

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
    // const toggleColorScheme = (value?: ColorScheme) =>
    //     setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    // const toggleColorScheme = () => {
    //     setColorScheme(colorScheme === "dark" ? "light" : "dark");
    //     document.body.style.background =
    //         colorScheme === "dark"
    //             ? "var(--mantine-color-white)"
    //             : "var(--mantine-color-dark-7)";
    //     document.body.style.color =
    //         colorScheme === "dark"
    //             ? "var(--mantine-color-black)"
    //             : "var(--mantine-color-dark-0)";
    // };

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

    return (
        <CacheProvider value={cache}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider withGlobalStyles withNormalizeCSS withCSSVariables
                    theme={{ colorScheme }}>
                    {children}
                </MantineProvider>
            </ColorSchemeProvider>
        </CacheProvider>
    );
}