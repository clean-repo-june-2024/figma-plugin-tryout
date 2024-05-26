import { Link } from "react-router-dom";
import { ModeToggle } from "./components/modeToggle";
import { Button } from "./components/ui/button";
import { Heading } from "./components/ui/typoghraphy";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/components/ui/card";

function App() {
  return (
    <div>
      <div className="flex px-1 justify-end">
        <ModeToggle />
      </div>
      <div className="bg-background px-8 py-16 flex flex-col gap-4 h-full">
        <Heading className="red-600" as="h1">
          Variableees
        </Heading>
        <Heading as="h4">Configuring variables can be easier..</Heading>
        <div className="mt-4 px-8 h-full grid grid-cols-3 items-start gap-x-2">
          <Card className="max-w-[400px]">
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>
                See all your token in a comprehensive way, for example which are
                your core tokens (aliases ones)
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link to="/dashboard">
                <Button>View Dashboard</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="max-w-[400px]">
            <CardHeader>
              <CardTitle>Import variables</CardTitle>
              <CardDescription>
                Import tokens with a comprehensive playground, from JSON and css
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button disabled variant="outline">
                Not available yet 🏗️
              </Button>
            </CardFooter>
          </Card>

          <Card className="max-w-[400px]">
            <CardHeader>
              <CardTitle>Export variables</CardTitle>
              <CardDescription>
                Export variables from figma to any formats
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button disabled variant="outline">
                Not available yet 🏗️
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
