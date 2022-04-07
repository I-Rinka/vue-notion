import { config } from "@/config.js";

const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: config.NOTION_KEY,
  baseUrl: config.NOTION_PROXY + "https://api.notion.com"
});

export const queryDatabase = async (databaseId, apiUrl = config.NOTION_API) => {
  return await notion.databases.query({
    database_id: databaseId
  });

  // const myHeaders = new Headers();
  // myHeaders.append("Origin", config.NOTION_API);
  // myHeaders.append("authorization", "Bearer " + config.NOTION_KEY);
  // myHeaders.append("Notion-Version", config.NOTION_API_VERSION);
  // return await fetch(config.NOTION_PROXY + `${apiUrl}databases/${databaseId}`, {
  //   headers: myHeaders
  // }).then(res => res.json());
};

export function DatabaseItemsAdaptor(listObject) {
  // go to property
  if (listObject.object !== "list") {
    console.log(listObject);
    return [];
  }
  return listObject.results.map(value => {
    let idReg = new RegExp("-", "g");
    let page = {
      created_time: value.created_time,
      last_edited_time: value.last_edited_time,
      id: value.id.replace(idReg, "")
    };
    for (const key in value.properties) {
      if (Object.hasOwnProperty.call(value.properties, key)) {
        const element = value.properties[key];
        if (element.type === "checkbox") {
          page[key] = element.checkbox;
        } else if (element.type === "multi_select") {
          page[key] = element.multi_select;
        } else if (element.type === "title") {
          let text = "";
          let newId = value.id;

          for (let index = 0; index < element.title.length; index++) {
            const title = element.title[index];
            if (title.type === "mention") {
              if (title.mention.type === "page") {
                newId = title.mention.page.id;
              }
            }
            text += title.plain_text;
          }
          page[key] = text;
          page.id = newId.replace(idReg, "");
        } else {
          page[key] = "❌currently unsupport " + element.type;
        }
      }
    }
    return page;
  });
}
