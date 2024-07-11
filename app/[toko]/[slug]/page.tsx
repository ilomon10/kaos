import { Header } from "@/components/Header";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import { SearchBoxActionButton } from "@/components/SearchBox/SearchBoxActionButton";
import {
  ActionIcon,
  AspectRatio,
  Box,
  Button,
  Divider,
  Image,
  Indicator,
  Rating,
  Text,
  Title,
} from "@mantine/core";
import { MenuIcon, ShareIcon, ShoppingCartIcon } from "lucide-react";
import { NavigationBar } from "./NavigationBar";

export default async function ProductPage() {
  const product_detail = [
    {
      label: "Kondisi",
      value: "Baru",
    },
    {
      label: "Berat Satuan",
      value: "80-160 g",
    },
    {
      label: "Min. Beli",
      value: "1",
    },
    {
      label: "Tipe Garansi",
      value: "Garansi Toko",
    },
  ];

  return (
    <div className="flex flex-col">
      <Header
        isSticky={true}
        rightSection={
          <>
            <SearchBoxActionButton />
            <Indicator>
              <ActionIcon variant="subtle" color="black">
                <ShoppingCartIcon size={22} />
              </ActionIcon>
            </Indicator>
            <ActionIcon variant="subtle" color="black">
              <MenuIcon size={22} />
            </ActionIcon>
          </>
        }
      />
      <main>
        <section className="hero-image">
          <AspectRatio>
            <Image src="https://placehold.co/600x400" />
          </AspectRatio>
        </section>
        <section className="pb-3">
          <div className="px-3 mt-2">
            <Text fz={24} fw={"bold"}>
              Rp809.000
            </Text>
          </div>
          <div className="px-3">
            <Text>
              Filter Lensa 2 in 1 K&F Concept ND2-32 + CPL Nano-D Series - 49mm
            </Text>
          </div>
          <div className="px-3 flex items-center gap-3 mt-3">
            <Text lh={1} size="sm">
              Terjual 3
            </Text>
            <Button
              variant="default"
              leftSection={<Rating count={1} value={1} />}
            >
              5.0 (1)
            </Button>
          </div>
        </section>
        <Divider size={12} />
        <section className="py-3 px-3">
          <Title order={4} mb={"xs"}>
            Detail Produk
          </Title>
          {product_detail.map((item, index) => (
            <div key={index} className="flex py-1 border-b border-gray-200">
              <Box flex={"2 0 0px"}>
                <Text c="gray.6">{item.label}</Text>
              </Box>
              <Box flex={"3 1 0px"}>
                <Text>{item.value}</Text>
              </Box>
            </div>
          ))}
          <Title order={4} my={"xs"}>
            Deskripsi Produk
          </Title>
          <Text size="sm">
            GARANSI 6 BULAN RUSAK GANTI BARU UNLIMITED CLAIM TANPA PERLU SIMPAN
            BOX
          </Text>
        </section>
      </main>
      <Divider />
      <footer className="px-3 pt-4 pb-20">
        <Text c="gray.6" size="xs">
          © 2024, Kaos
        </Text>
      </footer>

      <NavigationBar />
    </div>
  );
}
