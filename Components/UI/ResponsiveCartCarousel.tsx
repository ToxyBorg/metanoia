import { Carousel } from "@mantine/carousel";
import { AspectRatio, Badge, Card, Center, Group, Stack, useMantineColorScheme } from "@mantine/core";
import type { NextComponentType, NextPageContext } from "next";
import { CardContainerColors } from "../../Shared/colors";
import { cartType, SingleCartItemType } from "../../Stores/cartStore";
import Image from 'next/image';
import AddToCart from "../buttons/extraButtons/AddToCart";
import RemoveFromCart from "../buttons/extraButtons/RemoveFromCart";
import style from "../../Shared/css/styles.module.css";
import { IconContext } from "react-icons";

interface Props {
  cartItemsDataAtomValue: cartType,
  // info: SingleCartItemType,
}

const ResponsiveCartCarousel: NextComponentType<NextPageContext, {}, Props> = (
  props: Props,
) => {

  const { colorScheme, } = useMantineColorScheme();


  return (

    <IconContext.Provider
      value={{
        color: colorScheme === "dark" ? CardContainerColors.iconsLineColorDark : CardContainerColors.iconsLineColorLight,
        size: "2.5rem"
      }}>



      <Carousel slideGap={"xl"} withIndicators >
        {props.cartItemsDataAtomValue.map((info) => (
          <Carousel.Slide key={info.item.item_id} >
            <Center>
              <Card pos={"relative"} shadow="md"
                sx={{
                  border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                  width: "clamp(20%, 250px, 100%)",
                  // height: "clamp(50vh, 350px, 60vh)",
                  // width: "50%",
                  WebkitBackdropFilter: "blur(2px)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",

                }}
                radius={"md"}

              >

                <Card.Section>

                  <AspectRatio ratio={10 / 16}>
                    {/* <Image fill={true} src={info.item.mainImageURL} alt={info.item.title} loading='lazy' /> */}
                    <Image fill src={info.item.mainImageURL} alt={info.item.title} loading='lazy' />
                  </AspectRatio>
                  <Stack
                    pos={"absolute"}
                    top={0}
                    w={"100%"}
                  >
                    <Group position="apart" p={"1rem"} h={"fit-content"} spacing={"xs"}>

                      <Badge variant="gradient"
                        sx={{
                          border: `2px solid ${colorScheme === "dark"
                            ? CardContainerColors.borderColorDark
                            : CardContainerColors.borderColorLight}`,
                        }}
                        bg={colorScheme === "dark"
                          ? CardContainerColors.backgroundColorDark
                          : CardContainerColors.backgroundColorLight
                        }
                        className={style.Animated_Background_Gradient}
                      >
                        {info.item.title}
                      </Badge>

                      <Badge variant="gradient"
                        sx={{
                          border: `2px solid ${colorScheme === "dark"
                            ? CardContainerColors.borderColorDark
                            : CardContainerColors.borderColorLight}`,
                        }}
                        bg={colorScheme === "dark"
                          ? CardContainerColors.backgroundColorDark
                          : CardContainerColors.backgroundColorLight
                        }
                        className={style.Animated_Background_Gradient}
                      >
                        {info.itemNumber}
                      </Badge>
                    </Group>


                  </Stack>




                  <Stack
                    pos={"absolute"}
                    bottom={0}
                    w={"100%"}

                    bg={colorScheme === "dark"
                      ? CardContainerColors.backgroundColorDarkTranslucid
                      : CardContainerColors.backgroundColorLightTranslucid
                    }

                  >
                    <Group position="apart" p={"1rem"} h={"fit-content"} spacing={"xs"}>

                      <Badge variant="gradient"
                        sx={{
                          border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                        }}
                        bg={colorScheme === "dark"
                          ? CardContainerColors.backgroundColorDark
                          : CardContainerColors.backgroundColorLight
                        }
                        className={style.Animated_Background_Gradient}
                        size={"xl"}
                      >
                        {info.item.price} DA
                      </Badge>

                      <Group position="center">
                        <AddToCart cartItemsDataAtomValue={props.cartItemsDataAtomValue} info={info} />
                        <RemoveFromCart cartItemsDataAtomValue={props.cartItemsDataAtomValue} info={info} />
                      </Group>
                    </Group>


                  </Stack>
                </Card.Section>

              </Card>

            </Center>
          </Carousel.Slide>

        ))}
      </Carousel>

    </IconContext.Provider>

  )
}

export default ResponsiveCartCarousel