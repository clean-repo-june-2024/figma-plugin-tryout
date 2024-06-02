import * as Networker from "monorepo-networker";
import { initializeNetwork } from "@/common/network/init";
import { NetworkSide } from "@/common/network/sides";
import { NetworkMessages } from "@/common/network/messages";
import importVar from "./importVariables";
import exportToJSON from "./exportToJSON";
import importCSSVariables from "./importCSSVariables";

async function bootstrap() {
  initializeNetwork(NetworkSide.PLUGIN);

  if (figma.editorType === "figma") {
    figma.showUI(__html__, {
      width: 800,
      height: 650,
      title: "My Figma Plugin!",
    });
  } else if (figma.editorType === "figjam") {
    figma.showUI(__html__, {
      width: 800,
      height: 650,
      title: "My FigJam Plugin!",
    });
  }

  console.log("Bootstrapped @", Networker.Side.current.getName());

  NetworkMessages.HELLO_UI.send({ text: "Hey there, UI!" });

}

figma.ui.onmessage = async (e) => {
  console.log("code received message", e);
  if (e.type === "EXPORT") {
    await exportToJSON();
  }

  if (e.type === "IMPORT") {
    await importVar()
  }

  if(e.type === "IMPORT_CSS_VARIABLES") {
    console.log("here", e)
    await importCSSVariables({
      collectionName: e.collectionName,
      textareaValue: e.textareaValue
    })
  }
};


bootstrap();



const collection = figma.variables.createVariableCollection("new-collection")
collection.renameMode(collection.modes[0].modeId, "light")
const colorVariable = figma.variables.createVariable("color-variable", collection, "COLOR")

// rename our new variable and collection because naming is hard!
colorVariable.name = "text-primary"
collection.name = "semantic colors"

const lightModeId = collection.modes[0].modeId
const darkModeId = collection.addMode("dark")

// Sets the color to #000 in light mode and #fff in dark mode
colorVariable.setValueForMode(lightModeId, { r: 0, g: 0, b: 0 })
colorVariable.setValueForMode(darkModeId, { r: 1, g: 1, b: 1 })

