import { MainMenuButton } from "@/components/MainMenu/MainMenuButton";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import { ActionIcon } from "@mantine/core";
import { BellIcon, MenuIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="sticky top-0 z-10 bg-white flex gap-4 items-center px-2 py-2">
      <div className="flex-grow">
        <SearchBox />
      </div>
      {/* <ActionIcon variant="subtle" color="black">
        <MailIcon size={22}/>
      </ActionIcon> */}
      <div className="flex flex-shrink-0 gap-4">
        <ActionIcon
          component={Link}
          href="/notif-center"
          variant="subtle"
          color="black"
        >
          <BellIcon size={22} />
        </ActionIcon>
        <ActionIcon
          component={Link}
          href="/cart"
          variant="subtle"
          color="black"
        >
          <ShoppingCartIcon size={22} />
        </ActionIcon>
        <MainMenuButton />
      </div>
    </div>
  );
}
