import { createClient } from "@/utils/supabase/server";
import {
  Card,
  CardSection,
  Flex,
  Group,
  Image,
  Rating,
  Text,
  Title,
} from "@mantine/core";
import { DotIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import slugify from "slugify";
import Header from "./Header";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  const items = [
    {
      thumbnail: "https://placehold.co/600x400",
      title: "PUMA Sepatu Lari Transport Modern Fresh",
      price: 999000,
      discount: 25,
      rating: 5.0,
      copy: 12,
    },
    {
      thumbnail: "https://placehold.co/600x400",
      title: "PUMA Sepatu Lari Transport Modern Fresh",
      price: 999000,
      discount: 25,
      rating: 5.0,
      copy: 12,
    },
    {
      thumbnail: "https://placehold.co/600x400",
      title: "PUMA Sepatu Lari Transport Modern Fresh",
      price: 999000,
      discount: 25,
      rating: 5.0,
      copy: 12,
    },
    {
      thumbnail: "https://placehold.co/600x400",
      title: "PUMA Sepatu Lari Transport Modern Fresh",
      price: 999000,
      discount: 25,
      rating: 5.0,
      copy: 12,
    },
  ];

  return (
    <div className="flex flex-col">
      <Header />

      <main>
        <section className="px-2">
          <Title order={2} mt={"sm"} mb={"xs"}>
            For You
          </Title>
          <Flex
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="nowrap"
          >
            <div className="w-1/2 mr-1">
              {items.map((item, index) => (
                <Card
                  key={index}
                  component={Link}
                  href={`/toko/${slugify(item.title, { lower: true })}`}
                  mb={"lg"}
                >
                  <CardSection>
                    <Image src={item.thumbnail} />
                  </CardSection>
                  <CardSection mt={12}>
                    <Text size="sm">{item.title}</Text>
                    <Group gap={"2"} my={6}>
                      <Text fw={"bold"} lh={"18px"}>
                        Rp759.240
                      </Text>
                      <Text
                        fz={12}
                        td={"line-through"}
                        c={"gray.4"}
                        lh={"12px"}
                      >
                        Rp999.000
                      </Text>
                    </Group>
                    <Group gap={2} align="center">
                      <Rating size={"xs"} count={1} value={1} />
                      <Text c="gray.6" lh={1} fz={14}>
                        5.0
                      </Text>
                      <DotIcon color="var(--mantine-color-gray-6)" size={14} />
                      <Text c="gray.6" lh={1} fz={14}>
                        12 Terjual
                      </Text>
                    </Group>
                  </CardSection>
                </Card>
              ))}
            </div>
            <div className="w-1/2 ml-1">
              {items.map((item, index) => (
                <Card
                  key={index}
                  component={Link}
                  href={`/toko/${slugify(item.title, { lower: true })}`}
                  mb={"lg"}
                >
                  <CardSection>
                    <Image src={item.thumbnail} />
                  </CardSection>
                  <CardSection mt={12}>
                    <Text size="sm">{item.title}</Text>
                    <Group gap={"2"} my={6}>
                      <Text fw={"bold"} lh={"18px"}>
                        Rp759.240
                      </Text>
                      <Text
                        fz={12}
                        td={"line-through"}
                        c={"gray.4"}
                        lh={"12px"}
                      >
                        Rp999.000
                      </Text>
                    </Group>
                    <Group gap={2} align="center">
                      <Rating size={"xs"} count={1} value={1} />
                      <Text c="gray.6" lh={1} fz={14}>
                        5.0
                      </Text>
                      <DotIcon color="var(--mantine-color-gray-6)" size={14} />
                      <Text c="gray.6" lh={1} fz={14}>
                        12 Terjual
                      </Text>
                    </Group>
                  </CardSection>
                </Card>
              ))}
            </div>
            <div></div>
          </Flex>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
