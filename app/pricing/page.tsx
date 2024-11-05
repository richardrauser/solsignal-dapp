"use client";
import { PageTitle } from "@/components/pageTitle";
import { Panel } from "@/components/panel";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
// import { Image, Button, Slider } from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { HeartFilledIcon } from "@/components/icons";
import { PiChatsDuotone, PiCheck, PiCheckCircle } from "react-icons/pi";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { loadPricePlans, PricePlan } from "@/lib/storage";

export default function AboutPage() {
  const [loading, setLoading] = useState(true);
  const [pricePlans, setPricePlans] = useState<PricePlan[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const plans = await loadPricePlans();
      setLoading(false);
      setPricePlans(plans);
    };
    fetchData();
  }, []);

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

        {pricePlans?.map((plan, index) => (
          <Card
            key={index}
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
                    src={"/" + plan.image}
                    width="100%"
                  />
                </div>

                <div className="flex flex-col col-span-6 md:col-span-8">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-0">
                      <h3 className="text-large font-semibold font-medium text-foreground/90">
                        {plan.name}
                      </h3>
                      <p className="text-small text-foreground/80">
                        ${plan.price} USD / month
                      </p>
                      <h3 className="font-medium mt-2">{plan.alerts} alerts</h3>
                    </div>
                  </div>
                  <div className="fixed bottom-2 right-2">
                    <Button
                      isIconOnly
                      className="text-default-900/60 data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                      onPress={planSelected}
                    >
                      <PiCheckCircle
                        size={30}
                        // className={liked ? "[&>path]:stroke-transparent" : ""}
                        // fill={"currentColor"}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}

        <p className="m-4">
          All plans include unlimited notifications and all alert types.
        </p>
      </Panel>
    </div>
  );
}
