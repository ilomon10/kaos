import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  MenuItem,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import {
  Grid2X2Icon,
  PackageIcon,
  ReceiptCentIcon,
  ReceiptTextIcon,
  SettingsIcon,
  XIcon,
} from "lucide-react";
import React from "react";
import { Header } from "../Header";

type MainMenuPageProps = {
  onClose?: () => void;
};

export const MainMenuPage: React.FC<MainMenuPageProps> = ({ onClose }) => {
  return (
    <Flex direction={"column"}>
      <Header
        leftSection={
          <ActionIcon variant="subtle" c="black" onClick={onClose}>
            <XIcon size={22} />
          </ActionIcon>
        }
        centerSection={
          <Text fw={"bold"} fz={22}>
            Menu
          </Text>
        }
      />
      <section>
        <Group className="px-3 py-4">
          <Avatar size={"lg"} />
          <Box style={{ flexGrow: 1 }}>
            <Text fw="bold">John Cena</Text>
            <Text>35 Listing</Text>
          </Box>
          <ActionIcon variant="subtle" c="black">
            <SettingsIcon />
          </ActionIcon>
        </Group>
      </section>
      <section></section>
      <Divider size={8} />
      <Group component="section" className="py-3">
        <Button
          justify="start"
          variant="white"
          c="black"
          leftSection={<ReceiptTextIcon />}
          fullWidth
          fw={"normal"}
        >
          Transaction List
        </Button>
        <Button
          justify="start"
          variant="white"
          c="black"
          leftSection={<PackageIcon />}
          fullWidth
          fw={"normal"}
        >
          Products
        </Button>
        <Button
          justify="start"
          variant="white"
          c="black"
          leftSection={<Grid2X2Icon />}
          fullWidth
          fw={"normal"}
        >
          Design Listing
        </Button>
      </Group>
      <Divider size={8} />
      <section className="px-4 py-4">
        <Text size="xs" c={"gray"}>
          © 2024, Kaos
        </Text>
      </section>
    </Flex>
  );
};
