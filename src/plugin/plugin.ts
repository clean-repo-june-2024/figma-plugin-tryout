import * as Networker from "monorepo-networker";
import { initializeNetwork } from "@/common/network/init";
import { NetworkSide } from "@/common/network/sides";
import { NetworkMessages } from "@/common/network/messages";

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



async function exportToJSON() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  console.log("collections", collections);
  const data:Record<string,Record<string,string | number | boolean | VariableAlias | RGB | RGBA>> = {}

  for await (const collection of collections) {
    const variablesIds = collection.variableIds;
    for await (const variableId of variablesIds) {
      const variable = await figma.variables.getVariableByIdAsync(variableId);
      console.log("variable", variable);

      if(!variable) continue;
      else {
        if(!data[collection.name]) {
          data[collection.name] = {
            [variable.name]: variable.valuesByMode[collection.defaultModeId]
          }
        } else {
          data[collection.name][variable.name] = variable.valuesByMode[collection.defaultModeId]
        }
      }
    }
  }


  figma.ui.postMessage({ type: "EXPORT_RESULT", data });
}

figma.ui.onmessage = async (e) => {
  console.log("code received message", e);
  if(e.type === "EXPORT") {
    await exportToJSON();
  }
};

bootstrap();
