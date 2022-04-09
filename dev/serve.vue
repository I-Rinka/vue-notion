<template>
  <div id="app">
    <button @click="GetData">get data</button>
    <!-- <NotionRenderer :blockMap="blockMap" fullPage prism katex todo /> -->
    <div class="posts">
      <h2>All Posts</h2>
      <ul>
        <li v-for="(post, k) in posts" :key="k">
          <h1>{{ post.Name }}</h1>
          <!-- <NuxtLink v-if="post.id" :to="post.id" class="button--grey"> -->
          <!-- <b>{{ post.Name }}</b> -->
          <!-- </NuxtLink> -->
          <NotionRenderer :blockMap="pages[post.id]" prism katex todo />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  NotionRenderer,
  DatabaseItemsAdaptor,
  queryDatabase,
  getPageBlocks,
} from "@/entry";

import "prismjs";
import "prismjs/themes/prism.css";
import "katex/dist/katex.min.css";

export default {
  name: "ServeDev",
  components: {
    NotionRenderer,
  },
  data() {
    return { blockMap: null, posts: null, pages: {} };
  },
  methods: {
    async GetData() {
      const data = await queryDatabase("6c12515ae1d64423839e4540cacf49a5");
      console.log(data);
    },
  },
  async created() {
    // react-notion tester: 2e22de6b770e4166be301490f6ffd420
    // equation tester: 2a1d5226d68246deba627012081693f9
    // sync tester: c10e1556bec44f23a20f71497b3d98c4
    // table tester: bd1de400a8b349dc824f4f00e61d0797
    // todo tester: 235057194b954a60ace89c052a65d102
    // this.blockMap = await getPageBlocks("2e22de6b770e4166be301490f6ffd420");
    // let pageTable = await getPageTable("6c12515ae1d64423839e4540cacf49a5");
    let pageTable = DatabaseItemsAdaptor(
      await queryDatabase("6c12515ae1d64423839e4540cacf49a5")
    );
    this.posts = pageTable.filter((page) => page.Published);
    this.posts.forEach((element) => {
      getPageBlocks(element.id).then((ans) => {
        console.log(ans);
        this.$set(this.pages,element.id,ans);
      });
    });
  },
};
</script>

<style>
@import "./../src/styles.css";
body {
  margin: 0;
}
</style>
