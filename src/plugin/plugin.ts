import * as Networker from "monorepo-networker";
import { initializeNetwork } from "@/common/network/init";
import { NetworkSide } from "@/common/network/sides";
import { NetworkMessages } from "@/common/network/messages";
import { createAlias, traverseTokens } from "./importVariables/importVariables";

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
  // const collections = await figma.variables.getLocalVariableCollectionsAsync();
  // console.log("collections", collections);
  // const data:Record<string,Record<string,string | number | boolean | VariableAlias | RGB | RGBA>> = {}

  // for await (const collection of collections) {
  //   const variablesIds = collection.variableIds;
  //   for await (const variableId of variablesIds) {
  //     const variable = await figma.variables.getVariableByIdAsync(variableId);
  //     console.log("variable", variable);

  //     if(!variable) continue;
  //     else {
  //       if(!data[collection.name]) {
  //         data[collection.name] = {
  //           [variable.name]: variable.valuesByMode[collection.defaultModeId]
  //         }
  //       } else {
  //         data[collection.name][variable.name] = variable.valuesByMode[collection.defaultModeId]
  //       }
  //     }
  //   }
  // }

  const data = await figma.variables.getLocalVariablesAsync();
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  console.log("collections", collections);
  console.log("data", data);
  // console.log("data", JSON.stringify(data, null, 2))

  // if(data.length){
  //   const variable = await figma.variables.getVariableByIdAsync(data[0].id);
  //   console.log("variable", JSON.stringify(variable, null, 2));
  //   figma.ui.postMessage({ type: "EXPORT_RESULT", data: variable });
  // }

  for await (const collection of collections) {
    const fetchCollection = await figma.variables.getVariableCollectionByIdAsync(collection.id);
    const fetchCollectionVariables = fetchCollection?.variableIds ?? [];
    for await (const variableId of fetchCollectionVariables) {
      const fetchVariable = await figma.variables.getVariableByIdAsync(variableId);
      const fetchVariableValues = fetchVariable?.valuesByMode;
      figma.ui.postMessage({
        type: "EXPORT_RESULT", data: {
          collection: fetchCollection?.name,
          modes: fetchCollection?.modes,
          defaultMode: fetchCollection?.defaultModeId,
          type: fetchVariable?.resolvedType,
          name: fetchVariable?.name,
          values: fetchVariableValues
        }
      });
    }
  }
  // figma.ui.postMessage({ type: "EXPORT_RESULT", data });
}

async function importVar() {
  try {
    const collection = figma.variables.createVariableCollection('Example Collection');
    const modeId = collection.modes[0].modeId;

    const aliases = {};
    const tokens = {};

    const data = `{
      "color": {
        "grouptyped": {
          "$type": "color",
          "brown": { "$value": "#a2845e" },
          "danger-deep": { "$value": "{color.valuetyped.danger}" }
        },
        "valuetyped": {
          "red": {
            "$value": "{color.deep.deep.deep.deep.deep}"
          },
          "danger": { "$value": "{color.valuetyped.red}" }
        },
        "deep": {"deep": {"deep": {"deep": {"deep": {"$type": "color", "$value": "#FF0000" }}}}}
      },
      "spacing": {
        "$type": "number",
        "some numbers": {
          "spacer0": {"$value": 0},
          "spacerXs": {"$value": 4},
          "spacerS": {"$value": 8},
          "spacerM": {"$value": 16},
          "spacerX": {"$value": 24},
          "spacerXl": {"$value": 32},
          "spacerXxl": {"$value": 40},
          "spacex": {
            "funniness": {"$value": 0},
            "cleverness": {"$value": 1}
          }
        }
      }
    }`

    const json = JSON.parse(data);
    Object.entries(json).forEach(([key, object]) => {
      traverseTokens({
        collection: collection.id,
        modeId,
        type: json.$type,
        key,
        object,
        tokens,
        aliases,
      });
    });

    processAliases({ collection, modeId, aliases, tokens });
  } catch (e) {
    console.log("error", e);
  }
}

figma.ui.onmessage = async (e) => {
  console.log("code received message", e);
  if (e.type === "EXPORT") {
    await exportToJSON();
  }

  if (e.type === "IMPORT") {
    await importVar()
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


// not sure where to put that yet

function processAliases({ collection, modeId, aliases, tokens }: any) {
  try {
    aliases = Object.values(aliases);
    let generations = aliases.length;
    while (aliases.length && generations > 0) {
      for (let i = 0; i < aliases.length; i++) {

        const { key, valueKey } = aliases[i];
        console.log('here', { key, valueKey }, tokens)
        const token = tokens[valueKey];
        if (token) {
          aliases.splice(i, 1);
          tokens[key] = createAlias(collection, modeId, key, valueKey, tokens);
        }
      }
      generations--;
    }
  } catch (e) {
    console.log("could not create token", e);
  }
}