import { ActionIcon, Button } from "@mantine/core";
import { MessageSquareIcon } from "lucide-react";
import Link from "next/link";

export const NavigationBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 px-3 py-2 bg-white">
      <div className="flex gap-2">
        <ActionIcon variant="default" size="lg">
          <MessageSquareIcon size={22} />
        </ActionIcon>
        <Button variant="outline">
          Copy this Template
        </Button>
        <Button component={Link} href="/design/10/edit" flex={"1 0 0px"}>Edit now</Button>
      </div>
    </div>
  );
};
