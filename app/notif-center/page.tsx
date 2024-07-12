import { Header } from "@/components/Header";
import { MainMenuButton } from "@/components/MainMenu/MainMenuButton";
import { ActionIcon, Text } from "@mantine/core";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

export default async function NotifCenterPage() {
  return (
    <div>
      <Header
        centerSection={
          <Text fw={"bold"} fz={"lg"} lh={1}>
            Notification
          </Text>
        }
        rightSection={
          <>
            <ActionIcon
              component={Link}
              href="/cart"
              variant="subtle"
              color="black"
            >
              <ShoppingCartIcon size={22} />
            </ActionIcon>
            <MainMenuButton />
          </>
        }
      />
    </div>
  );
}
