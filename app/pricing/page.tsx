import { Link } from "@nextui-org/link";

import { PageTitle } from "@/components/pageTitle";
import { Panel } from "@/components/panel";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
// import { Image, Button, Slider } from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { HeartFilledIcon } from "@/components/icons";
import { PiCheck } from "react-icons/pi";
import toast from "react-hot-toast";

export default function AboutPage() {
  const planSelected = () => {
    console.log("Plan selected");
    toast.success("Pricing plans coming soon.");
  };

  return (
    <div className="text-left">
      <Panel>
        <PageTitle>Pricing</PageTitle>
        <p className="m-4">
          The following pricing tiers will be supported soon.
        </p>
        <Card
          isBlurred
          className="mb-4 border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
          shadow="sm"
        >
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
              <div className="relative col-span-6 md:col-span-4">
                <Image
                  alt="Album cover"
                  className="object-cover"
                  height={100}
                  shadow="md"
                  src="/SolSignalPricingFree.png"
                  width="100%"
                />
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0">
                    <h3 className="text-large font-semibold font-medium text-foreground/90">
                      Free
                    </h3>
                    <p className="text-small text-foreground/80">
                      $0 USD / month
                    </p>
                    <h3 className="font-medium mt-2">3 alerts</h3>
                  </div>
                  <Button
                    isIconOnly
                    className="text-default-900/60 data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                    // onPress={planSelected}
                  >
                    <PiCheck
                    // className={liked ? "[&>path]:stroke-transparent" : ""}
                    // fill={"currentColor"}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card
          isBlurred
          className="mb-4 border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
          shadow="sm"
        >
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
              <div className="relative col-span-6 md:col-span-4">
                <Image
                  alt="Album cover"
                  className="object-cover"
                  height={100}
                  shadow="md"
                  src="/SolSignalPricingBasic.png"
                  width="100%"
                />
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0">
                    <h3 className="text-large font-semibold font-medium text-foreground/90">
                      Basic
                    </h3>
                    <p className="text-small text-foreground/80">
                      $3 USD / month
                    </p>
                    <h3 className="font-medium mt-2">10 alerts</h3>
                  </div>
                  <Button
                    isIconOnly
                    className="text-default-900/60 data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                    // onPress={planSelected}
                  >
                    <PiCheck
                    // className={liked ? "[&>path]:stroke-transparent" : ""}
                    // fill={"currentColor"}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card
          isBlurred
          className="mb-4 border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
          shadow="sm"
        >
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
              <div className="relative col-span-6 md:col-span-4">
                <Image
                  alt="Album cover"
                  className="object-cover"
                  height={100}
                  shadow="md"
                  src="/SolSignalPricingPro.png"
                  width="100%"
                />
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0">
                    <h3 className="text-large font-semibold font-medium text-foreground/90">
                      Pro
                    </h3>
                    <p className="text-small text-foreground/80">
                      $10 USD / month
                    </p>
                    <h3 className="font-medium mt-2">100 alerts</h3>
                  </div>
                  <Button
                    isIconOnly
                    className="text-default-900/60 data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                    // onPress={planSelected}
                  >
                    <PiCheck
                    // className={liked ? "[&>path]:stroke-transparent" : ""}
                    // fill={"currentColor"}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <p className="m-4">
          All plans include unlimited notifications and all alert types.
        </p>
      </Panel>
    </div>
  );
}
