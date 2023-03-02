"use client"
import { Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { NextComponentType, NextPageContext } from "next";

interface Props { }

const TestingModals: NextComponentType<NextPageContext, {}, Props> = (
    props: Props,
) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal.Root opened={opened} onClose={close}>
                <Modal.Overlay />
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title>Modal title</Modal.Title>
                        <Modal.CloseButton />
                    </Modal.Header>
                    <Modal.Body>Modal content</Modal.Body>
                </Modal.Content>
            </Modal.Root>

            <Group position="center">
                <Button onClick={open}>Open modal</Button>
            </Group>
        </>
    );
}

export default TestingModals