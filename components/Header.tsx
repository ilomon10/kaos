"use client";

import { ActionIcon, Title } from "@mantine/core";
import {
  BellIcon,
  ChevronLeftIcon,
  MailIcon,
  MenuIcon,
  ShoppingCartIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { cx } from "class-variance-authority";

type HeaderProps = {
  isSticky?: boolean;
  withBorder?: boolean;
  leftSection?: React.ReactNode;
  centerSection?: React.ReactNode;
  rightSection?: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = ({
  isSticky = false,
  withBorder = true,
  leftSection,
  centerSection,
  rightSection,
}) => {
  const router = useRouter();
  return (
    <div
      className={cx(
        "min-h-12 flex flex-nowrap items-center px-2 py-2",
        withBorder && "border-b border-gray-200",
        isSticky && "sticky top-0 bg-white"
      )}
    >
      <div className="flex">
        {leftSection ? (
          leftSection
        ) : (
          <ActionIcon
            variant="subtle"
            color="black"
            onClick={() => {
              router.back();
            }}
          >
            <ChevronLeftIcon size={22} />
          </ActionIcon>
        )}
      </div>
      <div className="flex-grow flex-shrink px-2">{centerSection}</div>
      <div className="flex flex-shrink-0 gap-3">{rightSection}</div>
    </div>
  );
};
