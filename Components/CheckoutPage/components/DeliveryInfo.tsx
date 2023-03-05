import { Container, Divider, Grid, Group, SimpleGrid, Space, Stack } from "@mantine/core";
import type { NextComponentType, NextPageContext } from "next";
import { ReactNode, useState } from 'react';
import { TextInput, createStyles, rem } from '@mantine/core';

interface Props { }

const DeliveryInfo: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    return (
        <SimpleGrid
            cols={2}
            spacing="lg"
            breakpoints={[
                { maxWidth: 'sm', cols: 1, spacing: 'md' },
            ]}>
            <Container p={"lg"} w={"100%"} sx={{ border: "2px solid black" }}>
                <Stack>
                    <Divider my="xs" label="Required Fields" labelPosition="center" />
                    <FloatingLabelInput label={"Recipient's name"} placeholder={"Enter the name of the person receiving the package"} required={true} />
                    <FloatingLabelInput label={"Recipient's  address"} placeholder={"Enter the address where we should deliver"} required={true} />
                    <FloatingLabelInput label={"Recipient's  phone number"} placeholder={"Enter the recipient's phone number"} required={true} />

                    {/* <Space h="md" /> */}

                    <Divider my="xs" label="Not Required Fields" labelPosition="center" />
                    <FloatingLabelInput label={"Google Maps link"} placeholder={"Enter the address copied from Google Maps"} required={false} />
                    <FloatingLabelInput label={"Recipient's  message"} placeholder={"Enter a message to be written for the recipient"} required={false} />
                    <FloatingLabelInput label={"Recipient's  Instagram"} placeholder={"Enter the recipient's instagram username"} required={false} />
                </Stack>
            </Container>

            <Container p={"lg"} w={"100%"} sx={{ border: "2px solid black" }}>
                <Stack>
                    <Divider my="xs" label="Required Fields" labelPosition="center" />
                    <FloatingLabelInput label={"Recipient's name"} placeholder={"Enter the name of the person receiving the package"} required={true} />
                    <FloatingLabelInput label={"Recipient's  address"} placeholder={"Enter the address where we should deliver"} required={true} />
                    <FloatingLabelInput label={"Recipient's  phone number"} placeholder={"Enter the recipient's phone number"} required={true} />

                    {/* <Space h="md" /> */}

                    <Divider my="xs" label="Not Required Fields" labelPosition="center" />
                    <FloatingLabelInput label={"Google Maps link"} placeholder={"Enter the address copied from Google Maps"} required={false} />
                    <FloatingLabelInput label={"Recipient's  message"} placeholder={"Enter a message to be written for the recipient"} required={false} />
                    <FloatingLabelInput label={"Recipient's  Instagram"} placeholder={"Enter the recipient's instagram username"} required={false} />
                </Stack>
            </Container>

        </SimpleGrid>
    )
}

export default DeliveryInfo



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
            ? theme.colorScheme === 'dark'
                ? theme.white
                : theme.black
            : theme.colorScheme === 'dark'
                ? theme.colors.dark[3]
                : theme.colors.gray[5],
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
    required: boolean
}
export function FloatingLabelInput(inputProps: InputProps) {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');
    const { classes } = useStyles({ floating: value.trim().length !== 0 || focused });

    return (
        <TextInput
            label={inputProps.label}
            placeholder={inputProps.placeholder}
            required={inputProps.required}
            classNames={classes}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            mt="md"

        />
    );
}