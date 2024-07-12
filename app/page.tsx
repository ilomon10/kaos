import { createClient } from "@/utils/supabase/server";
import {
  ActionIcon,
  AspectRatio,
  Avatar,
  BackgroundImage,
  Card,
  CardSection,
  Divider,
  Flex,
  Group,
  Image,
  Rating,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import {
  DotIcon,
  FlameIcon,
  ShirtIcon,
  StarIcon,
  ThumbsUpIcon,
  TrendingUpIcon,
} from "lucide-react";
import Link from "next/link";
import slugify from "slugify";
import Header from "./Header";
import headerSectionBackground from "./designsHeaderSectionBackground.png";

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
      thumbnail: "https://placehold.co/600x400?text=Product+Photo",
      title: "PUMA Sepatu Lari Transport Modern Fresh",
      price: 999000,
      discount: 25,
      rating: 5.0,
      copy: 12,
    },
    {
      thumbnail: "https://placehold.co/600x400?text=Product+Photo",
      title: "PUMA Sepatu Lari Transport Modern Fresh",
      price: 999000,
      discount: 25,
      rating: 5.0,
      copy: 12,
    },
    {
      thumbnail: "https://placehold.co/600x400?text=Product+Photo",
      title: "PUMA Sepatu Lari Transport Modern Fresh",
      price: 999000,
      discount: 25,
      rating: 5.0,
      copy: 12,
    },
    {
      thumbnail: "https://placehold.co/600x400?text=Product+Photo",
      title: "PUMA Sepatu Lari Transport Modern Fresh",
      price: 999000,
      discount: 25,
      rating: 5.0,
      copy: 12,
    },
  ];

  const templates = [
    {
      label: "All",
      thumbnail: "https://unsplash.it/425/620?random",
    },
    {
      label: "Posters",
      thumbnail: "https://unsplash.it/425/620?shirt",
    },
    {
      label: "T-Shirt",
      thumbnail: "https://unsplash.it/425/620?image=1",
    },
    {
      label: "Hoodie",
      thumbnail: "https://unsplash.it/425/620",
    },
    {
      label: "Logos",
      thumbnail: "https://unsplash.it/425/620",
    },
    {
      label: "Bags",
      thumbnail: "https://unsplash.it/425/620",
    },
    {
      label: "Hats",
      thumbnail: "https://unsplash.it/425/620",
    },
  ];

  return (
    <div className="flex flex-col">
      <Header />

      <main>
        <section className="p-2 bg-gray-100">
          <Card radius={"lg"}>
            <CardSection>
              <BackgroundImage src={headerSectionBackground.src}>
                <Flex
                  h={"100%"}
                  direction={"column"}
                  justify={"center"}
                  py={"xl"}
                >
                  <Text
                    c={"white"}
                    ff={"monospace"}
                    fz={"h3"}
                    fw={800}
                    ta={"center"}
                    px={22}
                    mb={"lg"}
                  >
                    Pilih jo yang cocok di mata kong pesan. OK?!
                  </Text>
                  <div className="px-6">
                    <Group justify="space-evenly">
                      <ActionIcon
                        variant="white"
                        size={48}
                        color={"black"}
                        radius={"xl"}
                      >
                        <FlameIcon />
                      </ActionIcon>
                      <ActionIcon
                        variant="outline"
                        size={48}
                        color={"white"}
                        radius={"xl"}
                      >
                        <ShirtIcon />
                      </ActionIcon>
                      <ActionIcon
                        variant="outline"
                        size={48}
                        color={"white"}
                        radius={"xl"}
                      >
                        <ThumbsUpIcon />
                      </ActionIcon>
                    </Group>
                  </div>
                </Flex>
              </BackgroundImage>
            </CardSection>
          </Card>
        </section>
        <section className="bg-gray-100">
          <ScrollArea>
            <Group wrap={"nowrap"} px={"sm"} mt="sm" mb={"lg"}>
              {templates.map(({ label, thumbnail }, index) => (
                <Card
                  key={label}
                  w={120}
                  shadow={index > 0 ? "" : "md"}
                  bg={index > 0 ? "transparent" : "white"}
                >
                  <AspectRatio>
                    <Image
                      src={`https://unsplash.it/425/620?image=${index + 20}`}
                      radius="md"
                    />
                  </AspectRatio>
                  <Text size="sm" ta={"center"} mt={"sm"} c={"gray.6"}>
                    {label}
                  </Text>
                </Card>
              ))}
            </Group>
          </ScrollArea>
        </section>
        <section className="px-2 pt-4">
          <Flex
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="nowrap"
            className="-mx-2"
          >
            <div className="w-1/2 px-2">
              {items.map((item, index) => (
                <Card
                  key={index}
                  component={Link}
                  href={`/design/${slugify(item.title, { lower: true })}/edit`}
                  mb={"lg"}
                >
                  <CardSection>
                    <AspectRatio ratio={6 / (7 - 0.95 * Math.random())}>
                      <Image
                        radius={"md"}
                        src={`https://unsplash.it/425/620?image=${index + 10}`}
                      />
                    </AspectRatio>
                  </CardSection>
                  <CardSection mt={8}>
                    <Group gap="xs">
                      <Avatar />
                      <Text fw={"bold"} fz={"sm"}>
                        Marcelo Unruh
                      </Text>
                    </Group>
                  </CardSection>
                </Card>
              ))}
            </div>
            <div className="w-1/2 px-2">
              {items.map((item, index) => (
                <Card
                  key={index}
                  component={Link}
                  href={`/design/${slugify(item.title, { lower: true })}/edit`}
                  mb={"lg"}
                >
                  <CardSection>
                    <AspectRatio ratio={6 / (7 - 0.95 * Math.random())}>
                      <Image
                        radius={"md"}
                        src={`https://unsplash.it/425/620?image=${index}`}
                      />
                    </AspectRatio>
                  </CardSection>
                  <CardSection mt={8}>
                    <Group gap="xs">
                      <Avatar />
                      <Text fw={"bold"} fz={"sm"}>
                        Marcelo Unruh
                      </Text>
                    </Group>
                  </CardSection>
                </Card>
              ))}
            </div>
          </Flex>
        </section>
        <Divider size={18} my={"lg"} />
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
                    <AspectRatio>
                      <Image
                        src={`https://unsplash.it/425/620?image=${index}`}
                      />
                    </AspectRatio>
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
                    <AspectRatio>
                      <Image
                        src={`https://unsplash.it/425/620?image=${index + 10}`}
                      />
                    </AspectRatio>
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
