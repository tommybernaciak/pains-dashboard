import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function NftCollection() {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="uppercase text-2xl font-bold">
          Your pains:
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 grid-rows-4 gap-4"></CardContent>
    </Card>
  );
}

export default NftCollection;
