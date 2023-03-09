"use client"

import { ActionIcon, Container, Stack, Transition, useMantineColorScheme } from "@mantine/core";
import { useAtomValue } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import Link from "next/link";
import { CardContainerColors, NavBarColors } from "../../Shared/colors";
import style from "../../Shared/css/style";
import { MetanoiaSVG } from "../../Shared/icons";
import { cartItemsDataAtom } from "../../Stores/cartStore";
import { allItemsDataAtom } from "../../Stores/itemDataStore";
import { screenSizesAtom } from "../../Stores/screenSizesStore";
import ShowItem from "./ShowItem";

interface Props {
  itemID: string
}

const SingleItemContainer: NextComponentType<NextPageContext, {}, Props> = (
  props: Props,
) => {

  const screenSizes = useAtomValue(screenSizesAtom)
  const { colorScheme, } = useMantineColorScheme();

  const allItemsDataAtomValue = useAtomValue(allItemsDataAtom)

  const item = allItemsDataAtomValue.find((obj) => {
    return obj.item_id === props.itemID;
  });

  // const allDataFromCategory = categorizedItemsDataAtomValue[props.category]


  if (item == undefined) {
    return (
      <Transition mounted={screenSizes != "OUT_OF_RANGE"} transition="slide-right" duration={1500} timingFunction="ease">
        {(styles) =>
          <Container py={"xl"}
            style={styles}

            sx={(theme) => ({
              maxWidth: "1500px",
              border: `2px solid ${theme.colorScheme === "dark"
                ? CardContainerColors.borderColorDark
                : CardContainerColors.borderColorLight}`,
              borderRadius: 15,
              WebkitBackdropFilter: "blur(2px)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
            })}

            bg={colorScheme === "dark"
              ? CardContainerColors.backgroundColorDark
              : CardContainerColors.backgroundColorLight
            }

            className={style.Animated_Background_Gradient}
            mx={"auto"} my={"xl"}
          >
            <Stack>

              <h1>
                This item does not exist. Please try something else or head back home.
              </h1>

              <ActionIcon variant="transparent" component={Link} href={"/"}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}

                w={"15rem"} h={"15rem"}

                title={"Home"}
                mx={"auto"}
                radius={"lg"}
                sx={{
                  // borderRadius: 15,
                  WebkitBackdropFilter: "blur(2px)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                }}

              >
                {/* <home.icon title={home.name} /> */}
                <MetanoiaSVG
                  lineColor={colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight}
                  strokeColor={colorScheme === "dark" ? NavBarColors.iconsLineColorDark : NavBarColors.iconsLineColorLight}
                  strokeWidth={5}

                />

              </ ActionIcon>
            </Stack>


          </Container>
        }
      </Transition >
    )
  }

  else return (


    <Transition mounted={screenSizes != "OUT_OF_RANGE"} transition="slide-left" duration={1500} timingFunction="ease">
      {(styles) =>
        <Container my={"xl"} style={styles}>
          <ShowItem item={item} />
        </Container>}
    </Transition>


  )
}

export default SingleItemContainer