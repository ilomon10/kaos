import { Header } from "@/components/Header";
import { MainMenuButton } from "@/components/MainMenu/MainMenuButton";
import {
  ActionIcon,
  AspectRatio,
  Badge,
  Button,
  ColorSwatch,
  Grid,
  GridCol,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { NumberInput } from "./NumberInput";
import { NotebookIcon } from "lucide-react";

export default function CartPage() {
  return (
    <div>
      <Header
        isSticky
        centerSection={
          <Text fw={"bold"} fz={"lg"} lh={1}>
            Cart
          </Text>
        }
        rightSection={
          <>
            <MainMenuButton />
          </>
        }
      />
      <section>
        {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((val) => (
          <div key={val} className="px-3 py-3">
            <Grid>
              <GridCol span={4}>
                <AspectRatio>
                  <Image
                    src={"https://placehold.co/600x400?text=Product+Photo"}
                    radius={8}
                  />
                </AspectRatio>
              </GridCol>
              <GridCol span={8}>
                <div>
                  <Text c={"gray.6"}>Pink clothes</Text>
                  <Text fw={"bold"}>Rp580.000</Text>
                  <Group gap={8}>
                    <ColorSwatch color="red" size={18} />
                    <Badge variant="default">Shirt</Badge>
                    <Badge variant="default">L</Badge>
                    <Badge variant="default">Cotton Combed</Badge>
                  </Group>
                </div>
                <div className="flex mt-3">
                  <div className="flex-grow">
                    <ActionIcon variant="subtle" c={"gray.6"}>
                      <NotebookIcon size={22} />
                    </ActionIcon>
                  </div>
                  <NumberInput min={0} defaultValue={val} />
                </div>
              </GridCol>
            </Grid>
          </div>
        ))}
      </section>
      <div className="h-16"></div>
      <div className="fixed bottom-0 left-0 right-0 flex px-3 py-3 border-t border-gray-200 bg-white z-10">
        <div className="flex-grow"></div>
        <div className="flex gap-2 items-center">
          <div className="text-right">
            <Text c={"gray"} lh={1} fz={"sm"} mb={4}>
              Total
            </Text>
            <Text fw={"bold"} lh={1}>
              Rp580.000
            </Text>
          </div>
          <Button>Buy</Button>
        </div>
      </div>
    </div>
  );
}
