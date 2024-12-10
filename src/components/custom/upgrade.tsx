import { BUY_NFTS_URL } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import arrow from "/icons/arrow-up-right.svg";

function Upgrade() {
  const redirectToPage = () => {
    window.open(BUY_NFTS_URL, "_blank");
  };

  return (
    <Card className="bg-white py-8">
      <CardHeader className="py-0 pb-3">
        <CardTitle className="text-2xl font-semibold text-primary font-clash">
          Upgrade!
        </CardTitle>
      </CardHeader>
      <CardContent className="font-inter text-primary font-medium">
        You want a extend coverage? Buy more of our NFTs!
      </CardContent>
      <CardFooter className="flex items-center justify-end pb-0">
        <Button
          className="text-accent font-semibold font-clash text-xl"
          variant={"link"}
          onClick={redirectToPage}
        >
          Buy NFT’s <img src={arrow} />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Upgrade;
