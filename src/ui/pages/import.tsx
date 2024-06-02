import { SquareArrowUpRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Heading } from "../components/ui/typoghraphy";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useState } from "react";

const Import = () => {
  const [collectionName, setCollectionName] = useState<string>("");
  const [textareaValue, setTextareaValue] = useState<string>("");


  return (
    <div className="bg-background px-8 py-16 flex flex-col gap-4 h-full">
      <Heading as="h1">Import</Heading>
      <div className="py-10 flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <Button className="cursor-default" size={"sm"} onClick={() => {
            parent.postMessage({ pluginMessage: { type: "IMPORT" } }, "*")
          }}>
            Import Shadcn theme
            <a href="https://ui.shadcn.com/" target="_blank" title="see shadcn website" className="cursor-pointer" onClick={(e) => {
              e.stopPropagation()
            }}> <SquareArrowUpRight /></a>
          </Button>
          <Button className="cursor-default" size={"sm"}>
            Import Radix ui theme
            <a href="https://www.radix-ui.com/" target="_blank" title="see radix website" className="cursor-pointer" onClick={(e) => {
              e.stopPropagation()
            }}> <SquareArrowUpRight /></a>
          </Button>
        </div>

        <hr className="bg-primary border-1 border-primary" />
        <div className="flex flex-col gap-2">
          <Input onChange={(e) => { setCollectionName(e.target.value) }} type="text" placeholder="Collection name" />
          <Textarea onChange={(e) => {
            setTextareaValue(e.target.value)
          }} className="min-h-[200px]" placeholder="CSS variables" />
          <Button onClick={() => {
            parent.postMessage({ pluginMessage: { type: "IMPORT_CSS_VARIABLES", collectionName, textareaValue  } }, "*")
          }} type="submit">Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default Import;