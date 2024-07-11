import { ActionIcon, Input } from "@mantine/core";
import { Header } from "../Header";
import React from "react";
import { ChevronLeftIcon, SearchIcon, XIcon } from "lucide-react";

type SearchBoxPageProps = {
  onClose: () => void;
};

export const SearchBoxPage: React.FC<SearchBoxPageProps> = ({ onClose }) => {
  const [value, setValue] = React.useState("");
  return (
    <div>
      <Header
        withBorder={false}
        leftSection={
          <ActionIcon
            variant="subtle"
            color="black"
            onClick={() => {
              onClose();
            }}
          >
            <ChevronLeftIcon size={22} />
          </ActionIcon>
        }
        centerSection={
          <Input
            placeholder="Cari sesuatu di Toko"
            variant="unstyled"
            leftSection={<SearchIcon size={16} />}
            rightSectionPointerEvents="all"
            rightSection={
              value && (
                <ActionIcon
                  variant="subtle"
                  color="black"
                  onClick={() => setValue("")}
                >
                  <XIcon size={16} />
                </ActionIcon>
              )
            }
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        }
      />
    </div>
  );
};
