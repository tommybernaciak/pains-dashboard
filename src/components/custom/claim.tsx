import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

function Claim() {
  const navigate = useNavigate();
  const goToClaim = () => navigate("/claim");

  return (
    <Card className="bg-secondary-foreground py-8">
      <CardHeader className="py-0 pb-3 relative">
        <img
          src={`/assets/pig.png`}
          alt={`never-gonna-happen`}
          className="h-[130px] w-[130px] absolute -top-[100px] left-7"
        />
        <CardTitle className="text-[54px] font-semibold text-white font-clash !mt-6">
          Calm down...
        </CardTitle>
      </CardHeader>
      <CardContent className="font-inter text-primary font-medium text-white">
        Our team of insurtech specialist will review your case.
      </CardContent>
      <CardFooter className="flex items-center justify-end pb-0">
        <Button
          className="bg-accent text-white w-full font-clash font-semibold hover:!bg-accent hover:text-white hover:opacity-80"
          onClick={goToClaim}
        >
          Report a Claim
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Claim;
