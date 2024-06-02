import z from 'zod';
import { parseColor } from '../utils/color';

export const variableSchema = z.object({
  $type: z.enum(['color', 'number', 'string',]),
  $value: z.union([z.string(), z.number()])
});

type FigmaTokenType = "BOOLEAN" | "COLOR" | "FLOAT" | "STRING";
type tokenType = "color" | "number" | "string";

interface traverseTokensProps {
  collection: string,
  modeId: string,
  type: tokenType,
  key: string,
  object: any,
  tokens: any,
  aliases: any,
}

const isAliasToken = (value: string) => value.toString().trim().charAt(0) === "{";
const isColorToken = (type: string) => type === 'color';
const isNumberToken = (type: string) => type === 'number';
const isStringToken = (type: string) => type === 'string';

type FigmaTokenValue = string | number | { type: "VARIABLE_ALIAS", id: string };
const createToken = (collection: string, modeId: string, type: FigmaTokenType, name: string, value: FigmaTokenValue) => {
  console.log('creating token', collection, modeId, type, name, value)
  const token = figma.variables.createVariable(name, collection, type);
  console.log('setting value for mode', value, modeId)
  token.setValueForMode(modeId, value);
  return token;
}

export const createAlias = (collection: string, modeId: string, key: string, valueKey: string | number, tokens: Record<string, any>) => {
  const token = tokens[valueKey];
  return createToken(collection, modeId, token.resolvedType, key, {
    type: "VARIABLE_ALIAS",
    id: `${token.id}`,
  });
}

export const traverseTokens = ({
  collection,
  modeId,
  type,
  key,
  object,
  tokens,
  aliases,
}: traverseTokensProps) => {
  type = type || object.$type;

  const metaKey = key.startsWith('$')
  if (metaKey) return;

  const value = object.$value;

  if (value) {
    if (isAliasToken(value)) {
      const valueKey = value.trim()
        .replace(/\./g, "/")
        .replace(/[\{\}]/g, "");

      if (valueKey in tokens) {
        tokens[key] = createAlias(collection, modeId, key, valueKey, tokens);
      }

      aliases[key] = {
        key,
        type,
        valueKey,
      }

      return
    }

    if (isColorToken(type)) {
      tokens[key] = createToken(
        collection,
        modeId,
        "COLOR",
        key,
        parseColor(object.$value)
      );

      return
    }

    if (isNumberToken(type)) {
      tokens[key] = createToken(
        collection,
        modeId,
        "FLOAT",
        key,
        object.$value
      );

      return
    }

    if (isStringToken(type)) {
      console.log('not handled for now')
    }

    console.log("unsupported type", type, object);
  } else {
    Object.entries(object).forEach(([nestedKey, nestedValue]) => {
      if (nestedKey.charAt(0) !== "$") {
        traverseTokens({
          collection,
          modeId,
          type,
          key: `${key}/${nestedKey}`,
          object: nestedValue,
          tokens,
          aliases
        });
      }

    });
  }

  return
}