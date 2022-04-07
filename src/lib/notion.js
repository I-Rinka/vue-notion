import { config } from "@/config.js";
export const getDatabase = async (databaseId, apiUrl = config.NOTION_API) => {
  const myHeaders = new Headers();
  myHeaders.append("Origin","https://api.notion.com/");
  myHeaders.append("authorization", "Bearer " + config.NOTION_KEY);
  myHeaders.append("Notion-Version", config.NOTION_API_VERSION);
  return await fetch(
    `${apiUrl}databases/${databaseId}`,
    {
      headers: myHeaders,
    }
  ).then(res => res.json());
};
/*  await fetch(`${apiUrl}/databases/${}`,
    {
      headers: new Headers(
        {
          'authorization': 'Bearer '+config.NOTION_KEY,
          'Notion-Version': config.NOTION_API_VERSION,
        }
      )
    }
  ).then(res => res.json());
*/
// export const getPage = async pageId => {
//   const response = await notion.pages.retrieve({ page_id: pageId });
//   return response;
// };

// export const getBlocks = async blockId => {
//   const blocks = [];
//   let cursor;
//   while (true) {
//     const { results, next_cursor } = await notion.blocks.children.list({
//       start_cursor: cursor,
//       block_id: blockId
//     });
//     blocks.push(...results);
//     if (!next_cursor) {
//       break;
//     }
//     cursor = next_cursor;
//   }
//   return blocks;
// };
