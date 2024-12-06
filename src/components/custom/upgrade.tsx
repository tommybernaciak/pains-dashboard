import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

function Upgrade() {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          Upgrade!
        </CardTitle>
      </CardHeader>
      <CardContent className=" text-primary">
        You want a extend coverage? Buy more of our NFTs!
      </CardContent>
      <CardFooter className="text-accent">Buy NFT’s</CardFooter>
    </Card>
  );
}

export default Upgrade;
