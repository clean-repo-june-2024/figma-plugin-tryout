import { it, describe, expect, vi } from 'vitest';
import { traverseTokens, variableSchema } from './importVariables';
import { randomUUID } from 'crypto';

describe('variableSchema', () => {
  it('should throw is no key $type or $value', () => {
    const variable = {
      type: 'color',
      value: 'red'
    }

    expect(() => variableSchema.parse(variable)).toThrowError()
  })

  it('should throw is no key $type', () => {
    const variable = {
      $value: 'red'
    }

    expect(() => variableSchema.parse(variable)).toThrowError(/\$type/)
  })

  it('should throw is no key $value', () => {
    const variable = {
      $type: 'color'
    }

    expect(() => variableSchema.parse(variable)).toThrowError(/\$value/)
  })

  it('should return the variable', () => {
    const variable = {
      $type: 'color',
      $value: 'red'
    }

    expect(variableSchema.parse(variable)).toEqual(variable)
  })
})

describe('traverseTokens', () => {
  

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

  it('should parse tokens', () => {
    vi.stubGlobal('figma', {
      variables: {
        createVariable: () => {
          return {
            setValueForMode: () => {}
          }
        }
      }
    })
    const json = JSON.parse(data);
    const modeId = randomUUID();

    const aliases = {};
    const tokens = {};
    Object.entries(json).forEach(([key, object]) => {
      traverseTokens({
        collection: 'foo',
        modeId,
        type: json.$type,
        key,
        object,
        tokens,
        aliases,
      });
    });

    console.log('tokens', tokens);
    console.log('aliases', aliases);
  })
})