import { createAlias, traverseTokens } from "./importVariables";

const importVar = () => {
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

export default importVar;


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