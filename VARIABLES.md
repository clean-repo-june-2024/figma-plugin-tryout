# Working with variables

Variables are not yet totally defined there is a [community group working on it](https://design-tokens.github.io/community-group/format/#example-composite-token-example). I will handle both original form and dollar free form. But use the dollar free inside the code.


## Variable original form

```json
{
  "Majestic magenta": {
    "$value": "#ff00ff",
    "$type": "color"
  },
  "Translucent shadow": {
    "$value": "#00000080",
    "$type": "color"
  },
  "space": {
    "small": {
      "$type": "dimension",
      "$value": "0.5rem"
    }
  },
  "color": {
    "shadow-050": {
      "$type": "color",
      "$value": "#00000080"
    }
  },
  "shadow": {
    "medium": {
      "$type": "shadow",
      "$description": "A composite token where some sub-values are references to tokens that have the correct type and others are explicit values",
      "$value": {
        "color": "{color.shadow-050}",
        "offsetX": "{space.small}",
        "offsetY": "{space.small}",
        "blur": "1.5rem",
        "spread": "0rem"
      }
    }
  },

  "component": {
    "card": {
      "box-shadow": {
        "$description": "This token is an alias for the composite token {shadow.medium}",
        "$value": "{shadow.medium}"
      }
    }
  }
}
```

this shows two variables with the `$value` and `$type` field

## Variable dollar free form 

similar to what we saw but without the `$` and also the `$type` can be anything it will be the name of the collection holding the variable.

```json
{
  "dimension": {
    "scale": {
      "value": "2",
      "type": "dimension"
    },
    "xs": {
      "value": "4",
      "type": "dimension"
    },
    "sm": {
      "value": "{dimension.xs} * {dimension.scale}",
      "type": "dimension"
    },
    "md": {
      "value": "{dimension.sm} * {dimension.scale}",
      "type": "dimension"
    },
    "lg": {
      "value": "{dimension.md} * {dimension.scale}",
      "type": "dimension"
    },
    "xl": {
      "value": "{dimension.lg} * {dimension.scale}",
      "type": "dimension"
    }
  },
  "colors": {
    "black": {
      "value": "#000000",
      "type": "color"
    },
    "white": {
      "value": "#ffffff",
      "type": "color"
    },
    "gray": {
      "100": {
        "value": "#f7fafc",
        "type": "color"
      },
    }
  },
      "fontSizes": {
    "h1": {
      "value": "{fontSizes.h2} * 1.25",
      "type": "fontSizes"
    },
    "h2": {
      "value": "{fontSizes.h3} * 1.25",
      "type": "fontSizes"
    },
    "h3": {
      "value": "{fontSizes.h4} * 1.25",
      "type": "fontSizes"
    },
    "h4": {
      "value": "{fontSizes.h5} * 1.25",
      "type": "fontSizes"
    },
    "h5": {
      "value": "{fontSizes.h6} * 1.25",
      "type": "fontSizes"
    },
    "h6": {
      "value": "{fontSizes.body} * 1",
      "type": "fontSizes"
    },
    "body": {
      "value": "16",
      "type": "fontSizes"
    },
    "sm": {
      "value": "{fontSizes.body} * 0.85",
      "type": "fontSizes"
    },
    "xs": {
      "value": "{fontSizes.body} * 0.65",
      "type": "fontSizes"
    }
  }
}
```

