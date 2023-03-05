import { ActionIcon, Group, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { Notifications, showNotification } from "@mantine/notifications";
import type { NextComponentType, NextPageContext } from "next";
import { useState } from "react";
import { CardContainerColors, NavBarColors, StepperColors } from "../../../Shared/colors";
import style from "../../../Shared/css/style";
import { arrowNext, errorIcon } from "../../../Shared/icons";
import { cartType } from "../../../Stores/cartStore";
import MeasurementsCarousel from "../components/MeasurementsCarousel";

interface Props {
  cartItemsDataAtomValue: cartType,
  nextStep: () => void
}

const MeasurementsStep: NextComponentType<NextPageContext, {}, Props> = (
  props: Props,
) => {
  const { colorScheme, } = useMantineColorScheme();

  return (
    <Stack>
      <MeasurementsCarousel cartItemsDataAtomValue={props.cartItemsDataAtomValue} />

      {/* <Notifications position="top-center" limit={1} /> */}

      <ActionIcon variant="outline" title={arrowNext.name} w={"fit-content"} h={"100%"}
        mx={"auto"} py={"xs"} radius={"md"} px={"lg"}
        bg={colorScheme === "dark" ? NavBarColors.backgroundColorDark : NavBarColors.backgroundColorLight}
        className={style.Animated_Background_Gradient}
        onClick={() => {
          const fieldsHaveBeenFilled = props.cartItemsDataAtomValue.map(info => {
            if (info.measurements == null || info.measurements == undefined || info.measurements?.length <= 0) {
              return false
            }
            return true
          })

          if (fieldsHaveBeenFilled.includes(false)) {
            showNotification({

              color: "red",
              radius: "md",
              title: 'Measurements Error',
              message: <p>One or More fields have been left blank!</p>,
              // icon: <errorIcon.icon />,

              styles: (theme) => ({


                root: {
                  background: colorScheme === "dark"
                    ? CardContainerColors.backgroundColorDark
                    : CardContainerColors.backgroundColorLight,
                  backgroundSize: "300% 300%",
                  animation: `${style.AnimateBG} 7s ease infinite`,

                  border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                },

                title: {

                  background: colorScheme === "dark"
                    ? CardContainerColors.backgroundColorDark
                    : CardContainerColors.backgroundColorLight,
                  backgroundSize: "300% 300%",
                  animation: `${style.AnimateBG} 7s ease infinite`,


                  // border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                  padding: "0.5rem",
                  borderRadius: 5,

                  fontWeight: "bolder",
                  color: colorScheme === "dark"
                    ? CardContainerColors.textColorDark
                    : CardContainerColors.textColorLight
                },
                description: {
                  fontStyle: "italic",

                  color: colorScheme === "dark"
                    ? CardContainerColors.textColorDark
                    : CardContainerColors.textColorLight
                },
                closeButton: {
                  color: colorScheme === "dark"
                    ? CardContainerColors.textColorDark
                    : CardContainerColors.textColorLight,

                  '&:hover': {
                    backgroundColor: "red"
                  },
                },
              }),

            })
          }
          else {
            props.nextStep()
          }
        }}
        sx={{
          border: `2px solid ${colorScheme === "dark" ? NavBarColors.borderColorDark : NavBarColors.borderColorLight}`
        }}
      >
        <Group>
          <arrowNext.icon />
          <Text size={"md"}
            color={colorScheme === "dark"
              ? StepperColors.iconsLineColorDark
              : StepperColors.iconsLineColorLight
            }
          >
            Confirm your measurements
          </Text>
        </Group>
      </ActionIcon>


    </Stack>
  )
}

export default MeasurementsStep



