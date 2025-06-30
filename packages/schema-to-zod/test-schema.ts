import { schemaToZod } from './src/index.js';

// Test data based on the hero-section component
const testContentTypes = [
  {
    name: 'hero-section',
    schema: {
      "layout": {
        "type": "option",
        "pos": 0,
        "use_uuid": true,
        "exclude_empty_option": true,
        "options": [
          {
            "_uid": "19843705-c9b0-4114-aa26-7f0adb8f472e",
            "name": "Stacked",
            "value": "stacked"
          },
          {
            "_uid": "0e57b099-8019-44fd-956c-86e1f973dbf8",
            "value": "split",
            "name": "Split"
          }
        ],
        "default_value": "stacked",
        "id": "bu72h3lgQsyWPCCPcc7DdQ"
      },
      "background_color": {
        "type": "option",
        "pos": 1,
        "id": "V8X92DI4Tu-riwSgo7qz9g",
        "field_type": "storyblok-palette",
        "options": [],
        "use_uuid": true,
        "source": "internal",
        "datasource_slug": "highlight-and-background-colors",
        "default_value": "primary-background"
      },
      "secondary_background_color": {
        "type": "option",
        "pos": 2,
        "field_type": "storyblok-palette",
        "options": [
          {
            "name": "size",
            "value": "medium",
            "_uid": "90287a8a-2b6c-44c1-b90d-9f668057f6d1"
          },
          {
            "name": "colors",
            "value": "[\"#E4DDB9\", \"#A59441\", \"#9D86F7\", \"#8D60FF\", \"#F5F5F7\", \"#FFFFFF\"]",
            "_uid": "9ae4f184-636a-41d9-9dbd-613c74a72107"
          },
          {
            "name": "defaultValue",
            "value": "#A59441",
            "_uid": "6f8e8923-40ad-4582-9f86-0acf2bbfa4a7"
          }
        ],
        "id": "VZ6MOznPRryCyvWxZw6GqQ",
        "conditional_settings": [
          {
            "modifications": [
              {
                "display": "hide"
              }
            ],
            "rule_match": "any",
            "rule_conditions": [
              {
                "validated_object": {
                  "type": "field",
                  "field_key": "layout",
                  "field_attr": "value"
                },
                "validation": "equals",
                "value": "stacked"
              }
            ]
          }
        ],
        "use_uuid": true,
        "source": "internal",
        "datasource_slug": "highlight-and-background-colors",
        "default_value": "primary-background"
      },
      "text_alignment": {
        "type": "option",
        "pos": 3,
        "use_uuid": true,
        "id": "YPSaV4xCRPmrM5BhQ4Hh_Q",
        "conditional_settings": [
          {
            "modifications": [
              {
                "display": "hide"
              }
            ],
            "rule_match": "any",
            "rule_conditions": [
              {
                "validated_object": {
                  "type": "field",
                  "field_key": "layout",
                  "field_attr": "value"
                },
                "validation": "equals",
                "value": "split"
              }
            ]
          }
        ],
        "options": [
          {
            "_uid": "9bc58813-f8d6-4068-af1f-1bfe799eb36b",
            "name": "Left",
            "value": "left"
          },
          {
            "_uid": "bf4f024b-c2ce-4c16-8036-da27f023b831",
            "value": "center",
            "name": "Center"
          }
        ],
        "exclude_empty_option": true,
        "default_value": "left"
      },
      "image_decoration": {
        "type": "boolean",
        "pos": 4,
        "id": "jXdnmbdNTgmhhiYj16_7nQ"
      },
      "text": {
        "type": "textarea",
        "pos": 7,
        "id": "qiidA8E8RJOR7lk9I7J9Gg"
      },
      "buttons": {
        "type": "bloks",
        "restrict_type": "",
        "restrict_components": true,
        "component_whitelist": [
          "button"
        ],
        "maximum": 2,
        "pos": 8,
        "key": "buttons",
        "component_group_whitelist": [],
        "id": "iTLm_mG3S82DBGfOtKaqow"
      },
      "image": {
        "type": "asset",
        "pos": 9,
        "id": "RnwBi4fPT7aGuNoazqKrsA"
      },
      "tab-a0e0afc8-5c9f-410d-b002-ba41e64e8568": {
        "display_name": "Style",
        "keys": [
          "alignment",
          "background_color",
          "secondary_background_color",
          "text_alignment",
          "image_decoration",
          "layout"
        ],
        "pos": 10,
        "type": "tab",
        "key": "tab-a0e0afc8-5c9f-410d-b002-ba41e64e8568",
        "id": "oOCvyFyfQQ2wArpB5k6FaA"
      },
      "preserve_image_aspect_ratio": {
        "type": "boolean",
        "pos": 11,
        "id": "yTGdMdj2QNqHWkCsQl2m-Q"
      }
    }
  }
];

console.log('Testing schema conversion...\n');
const zodSchemas = schemaToZod(testContentTypes);
const fullOutput = `import { z } from 'zod';\n\n${zodSchemas}`;
console.log(fullOutput); 