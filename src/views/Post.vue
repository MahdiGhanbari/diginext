<template>
  <v-app-bar height="240" rounded="t-xl" flat class="d-flex">
    <template v-slot:image>
      <v-img
        src="@/assets/images/appbar_background.png"
        gradient="180deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 55%"
      />
    </template>
    <div class="toolbar-content">
      <v-btn icon size="x-small">
        <v-img src="@/assets/images/back-arrow.svg" width="24"/>
      </v-btn>
      <v-btn icon size="x-small">
        <v-img src="@/assets/images/heart.svg" width="24"/>
      </v-btn>
    </div>
  </v-app-bar>
  <v-main>
    <div class="main-body">
      <span v-for="tag in postBlog.tags" :key="tag" class="main-body__tag">
        {{ tag }}
      </span>
      <h2 class="main-body__title">
        {{ postBlog.title }}
      </h2>
      <p class="main-body__description">Tortor, magnis porta id tellus faucibus.</p>
      <profile :name="postBlog.author" :date="postBlog.date" class="main-body__author-profile"/>
      <div class="main-body__content" v-html="postBlog.content"/>
    </div>
    <div class="about-body d-flex">
      <v-avatar size="48" class="about-body__avatar">
        <v-img src="@/assets/images/user_profile_ex.png"/>
      </v-avatar>
      <div>
        <h3 class="about-body__title">About the author</h3>
        <p class="about-body__content">Latoyia is a New York Times bestseller and a RITA® winner.</p>
        <div>
          <v-btn rounded color="#610BEF" flat class="about-body__follow-btn text-capitalize" prepend-icon="mdi-check">
            Following
          </v-btn>
          <v-btn size="small" icon variant="outlined" class="about-body__bookmark-btn">
            <v-img src="@/assets/images/bookmark.svg" width="12.23"/>
          </v-btn>
        </div>
      </div>
    </div>
    <div class="share-body">
      <h3 class="share-body__title">Share a replay?</h3>
      <v-form @submit.prevent="createComment">
        <textarea v-model="newComment"  placeholder="Your message..." class="share-body__message-input"/>
        <v-btn type="submit" class="share-body__submit-btn text-capitalize" rounded variant="outlined" flat color="#610BEF">Submit</v-btn>
      </v-form>
      <div v-for="comment in postBlog.comments" :key="comment.username" class="share-body__comment">
        <profile :name="comment.username" :date="comment.date"/>
        <p class="share-body__comment-text">
          {{ comment.text }}
        </p>
      </div>
    </div>
  </v-main>
</template>

<script lang="ts" setup>
import { inject, ref, onBeforeMount } from 'vue'
import { DB, Post } from '@/plugins/db'
import Profile from '@/components/Profile.vue';
import { useRoute } from 'vue-router';


// variables
const db: DB = inject('db') as DB
const postBlog = ref<Post>({} as Post)
const newComment = ref('')
const postId = ref(1)

// methods
async function createComment() {
  const res = await db.createComment(1, {text: newComment.value})
  if(res) {
    // TODO: refresh the post blog to get last comment
    console.log(res)
  }
}
async function getPost(id: number) {
  const res = await db.getBlogPost(id)
  if(res) {
    postBlog.value = res
  }
}

onBeforeMount(()=> {
  const route = useRoute()
  const { id } = route.params
  postId.value = +id || 1
  getPost(postId.value)
})



</script>

<style scoped lang="scss">
.toolbar-content {
  flex: 1;
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: baseline;
  padding-top: 60px;
  padding-inline: 20px;
  & > * {
    flex-grow: 0;
  }
}
.main-body {
  padding: 32px 39px;
  &__tag {
    background: #BFBEFC;
    border-radius: 8px;
    font-weight: 500;
    font-size: 13px;
    color: #4700AB;
    background-color: #BFBEFC;
    padding: 3px 8px;
    display: inline-block;
    line-height: 22px;
  }
  &__tag + &__tag {
    margin-inline-start: 6px;
  }
  &__title {
    margin-top: 16px;
    font-weight: 700;
    font-size: 28px;
    line-height: 40px;
    letter-spacing: 1px;
  }
  &__description {
    line-height: 32px;
    color: #14142B;
  }
  &__content {
    line-height: 28px;
    color: #4E4B66;
    & :where(p+p) {
      margin-top: 16px;
    }
  }
  &__description,
  &__content {
    font-weight: 400;
    font-size: 17px;
    letter-spacing: 0.75px;
  }
  &__author-profile {
    margin-block: 20px;
  }
}
.about-body {
  padding: 28px 36px;
  background-color: #EFF0F7;
  &__avatar {
    margin-inline-end: 23px;
  }
  &__title {
    font-weight: 700;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: 1px;
  }
  &__content {
    font-weight: 400;
    font-size: 15px;
    line-height: 24px;
    letter-spacing: 0.75px;
    margin-bottom: 16px;
  }
  &__follow-btn {
    width: 125px;
    height: 40px;
    margin-inline-end: 16px;
    color: white;
  }
  &__bookmark-btn {
    border-width: 2px;
    color: #D9DBE9;
  }
}
.share-body {
  margin: 30px 24px;
  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 34px;
    letter-spacing: 1px;
  }
  &__message-input {
    height: 96px;
    width: 100%;
    margin-block: 16px 8px;
    background-color: #EFF0F7;
    border-radius: 16px;
    padding: 20px;
    resize: none;
  }
  &__comment {
    margin-top: 36px;
  }
  &__comment-text {
    margin-top: 12px;
    width: 100%;
    background: #EFF0F7;
    border-radius: 0px 32px 32px 32px;
    padding: 20px 24px;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    letter-spacing: 0.75px;
    color: #4E4B66;
  }
}
.share-body__submit-btn,
.about-body__follow-btn {
  // font-weight: 600;
  font-size: 13px;
  line-height: 22px;
  letter-spacing: 0.25px !important;
}
</style>
