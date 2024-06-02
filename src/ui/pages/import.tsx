import { Button } from "../components/ui/button";
import { Heading } from "../components/ui/typoghraphy";

const Import = () => {

    return (
        <div className="bg-background px-8 py-16 flex flex-col gap-4 h-full">
            <Heading as="h1">Import</Heading>
            <div className="py-10">
                <Button
                    onClick={() => {
                        parent.postMessage({ pluginMessage: { type: "IMPORT" } }, "*")
                    }}
                >Import Shadcn theme</Button>
            </div>
        </div>
    );
};

export default Import;