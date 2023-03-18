import { Carousel } from "@mantine/carousel";
import { AspectRatio, Card, Center, Container, createStyles, Group, Loader, LoadingOverlay, rem, Stack, Text, TextInput, useMantineColorScheme } from "@mantine/core";
import { useAtom, useSetAtom } from "jotai";
import type { NextComponentType, NextPageContext } from "next";
import Image from "next/image";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { IconContext } from "react-icons";
import { CardContainerColors } from "../../../Shared/colors";
import { cartItemsDataAtom, cartType, SingleCartItemType } from "../../../Stores/cartStore";
import { orderItemsDataAtom } from "../../../Stores/orderStore";

interface Props {
    cartItemsDataAtomValue: cartType,
    // setFieldsHaveBeenFilled: Dispatch<SetStateAction<boolean>>

}


const MeasurementsCarousel: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const { colorScheme, } = useMantineColorScheme();
    const [mainImageLoading, setMainImageLoading] = useState(true);
    const cartItemsDataAtomSetter = useSetAtom(cartItemsDataAtom)

    return (

        <IconContext.Provider
            value={{
                color: colorScheme === "dark" ? CardContainerColors.iconsLineColorDark : CardContainerColors.iconsLineColorLight,
                size: "2.5rem"
            }}>



            <Carousel slideGap={"xl"} withIndicators
                styles={{
                    indicators: {
                        top: 0,
                        margin: "1rem",
                    }
                }}
            >
                {props.cartItemsDataAtomValue.map((info) => {

                    if (info.item.allow_measurements == "DEFAULT") {
                        const newArr = props.cartItemsDataAtomValue.map(obj => {

                            if (obj.item.item_id === info.id) {

                                return {
                                    ...obj,
                                    measurements: "DEFAULT"
                                };
                            }
                            return obj;
                        });
                        cartItemsDataAtomSetter(newArr)

                        return <></>
                    }

                    else {
                        return (
                            <Carousel.Slide key={info.item.item_id} >
                                <Center>

                                    <Card pos={"relative"} shadow="md"
                                        sx={{
                                            border: `2px solid ${colorScheme === "dark" ? CardContainerColors.borderColorDark : CardContainerColors.borderColorLight}`,
                                            width: "clamp(20%, 250px, 100%)",
                                            WebkitBackdropFilter: "blur(2px)",
                                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                                        }}
                                        radius={"md"}

                                    >
                                        <Card.Section>
                                            <AspectRatio ratio={10 / 16}>
                                                <LoadingOverlay visible={mainImageLoading} overlayBlur={5} radius={"xs"}
                                                    loader={<Loader color="pink" size="xl" />}
                                                />
                                                <Image fill src={info.item.mainImageURL} alt={info.item.title} loading='lazy'
                                                    onLoadingComplete={() => setMainImageLoading(false)}

                                                />
                                            </AspectRatio>

                                            <Container
                                                pos={"absolute"}
                                                bottom={0}
                                                w={"100%"}

                                                p={"1rem"}
                                                bg={colorScheme === "dark"
                                                    ? CardContainerColors.backgroundColorDarkTranslucid
                                                    : CardContainerColors.backgroundColorLightTranslucid
                                                }
                                            >
                                                {/* {info.item.allow_measurements == "ALLOW" && */}
                                                <FloatingLabelInput
                                                    label={"Measurements"}
                                                    placeholder={"In centimeters"}
                                                    required={true}
                                                    info={info}
                                                    cartItemsDataAtomValue={props.cartItemsDataAtomValue}
                                                />
                                                {/* } */}
                                            </Container>

                                        </Card.Section>

                                    </Card>

                                </Center>
                            </Carousel.Slide>
                        )
                    }
                }
                )


                }
            </Carousel>

        </IconContext.Provider>

    )
}

export default MeasurementsCarousel


//////////////////////////////////////////////////////////////////////////


const useStyles = createStyles((theme, { floating }: { floating: boolean }) => ({
    root: {
        position: 'relative',
    },

    label: {
        position: 'absolute',
        zIndex: 2,
        top: rem(7),
        left: theme.spacing.sm,
        pointerEvents: 'none',
        color: floating
            ? theme.colorScheme === "dark"
                ? CardContainerColors.textColorDark
                : CardContainerColors.textColorLight

            : theme.colorScheme === 'dark'
                ? theme.colors.dark[3]
                : theme.colors.gray[6],
        transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
        transform: floating ? `translate(-${theme.spacing.sm}, ${rem(-28)})` : 'none',
        fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
        fontWeight: floating ? 500 : 400,
    },

    required: {
        transition: 'opacity 150ms ease',
        opacity: floating ? 1 : 0,
    },

    input: {
        '&::placeholder': {
            transition: 'color 150ms ease',
            color: !floating ? 'transparent' : undefined,
        },
    },
}));

interface InputProps {
    label: ReactNode,
    placeholder: string | undefined,
    required: boolean,
    info: SingleCartItemType,
    cartItemsDataAtomValue: cartType,

}
export function FloatingLabelInput(inputProps: InputProps) {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState(
        inputProps.info.measurements != null ? inputProps.info.measurements : ""
    );
    const { classes } = useStyles({ floating: value.trim().length !== 0 || focused });
    // const { colorScheme, } = useMantineColorScheme();

    const cartItemsDataAtomSetter = useSetAtom(cartItemsDataAtom)
    const RightSection = () => {
        return (
            <Text
                sx={{
                    marginRight: "0.5rem"
                }}
            >
                Cm
            </Text>
        )
    }

    return (
        <TextInput
            rightSection={<RightSection />}
            label={inputProps.label}
            placeholder={inputProps.placeholder}
            required={inputProps.required}
            classNames={classes}
            value={value}
            onChange={

                (event) => {

                    const newArr = inputProps.cartItemsDataAtomValue.map(obj => {

                        if (obj.item.item_id === inputProps.info.id) {

                            return {
                                ...obj,
                                measurements: event.currentTarget.value
                            };
                        }
                        return obj;
                    });
                    cartItemsDataAtomSetter(newArr)

                    setValue(event.currentTarget.value)
                }

            }
            // styles={{
            //     input: {
            //         border: `2px solid ${colorScheme === "dark"
            //             ? CardContainerColors.borderColorDark
            //             : CardContainerColors.borderColorLight}`,
            //     }
            // }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            mt="md"

        />
    )

}