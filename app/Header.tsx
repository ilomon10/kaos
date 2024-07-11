import { MainMenuButton } from "@/components/MainMenu/MainMenuButton";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import { ActionIcon } from "@mantine/core";
import { BellIcon, MenuIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex gap-4 items-center px-2 py-2">
      <SearchBox />
      {/* <ActionIcon variant="subtle" color="black">
        <MailIcon size={22}/>
      </ActionIcon> */}
      <ActionIcon
        component={Link}
        href="/notification"
        variant="subtle"
        color="black"
      >
        <BellIcon size={22} />
      </ActionIcon>
      <ActionIcon variant="subtle" color="black">
        <ShoppingCartIcon size={22} />
      </ActionIcon>
      <MainMenuButton />
    </div>
  );
}
