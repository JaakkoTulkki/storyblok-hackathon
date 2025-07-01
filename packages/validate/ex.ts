import { validate } from "./src/validate";

const component = {
    "story": {
      "name": "Technology",
      "created_at": "2025-06-30T08:35:51.283Z",
      "published_at": "2025-04-07T13:46:22.069Z",
      "updated_at": "2025-06-30T08:35:51.283Z",
      "id": 63827768462179,
      "uuid": "6a3157a0-5e02-4bdf-b75b-4ee9a75c700c",
      "content": {
        "_uid": "f54f140f-d430-44dd-a659-f77d2c03cf36",
        "icon": {
          "id": 21735180,
          "alt": "",
          "name": "",
          "focus": "",
          "title": "",
          "source": "",
          "filename": "https://a.storyblok.com/f/329757/24x24/21d3ca6761/technology-category.svg",
          "copyright": "",
          "fieldtype": "asset",
          "meta_data": {
  
          },
          "is_external_url": false
        },
        "headline": "Technology",
        "component": "category",
        "meta_title": "",
        "meta_description": ""
      },
      "slug": "technology",
      "full_slug": "categories/technology",
      "sort_by_date": null,
      "position": -40,
      "tag_list": [],
      "is_startpage": false,
      "parent_id": 63827767941968,
      "meta_data": null,
      "group_id": "7be13484-ef69-4e6e-a2fb-8d8baf3e0f3c",
      "first_published_at": "2025-02-25T14:30:13.289Z",
      "release_id": null,
      "lang": "default",
      "path": null,
      "alternates": [],
      "default_full_slug": null,
      "translated_slugs": null
    },
    "cv": 1751295442,
    "rels": [],
    "links": []
  };



const result = validate(component.story.content);
console.log(result);