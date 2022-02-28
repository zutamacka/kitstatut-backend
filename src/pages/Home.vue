<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-md">
      <template v-if="!loadingPosts && posts.length">
        <div class="col-12 col-sm-8">
          <single-post v-for="post in posts" :key="post.id" :post="post" />
        </div>
      </template>
      <template v-else-if="!loadingPosts && !posts.length">
        <no-posts />
      </template>
      <template v-else>
        <skeleton-post />
      </template>
      <div class="col-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="48px">
              <img src="~assets/MaineCoon.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">Floofster</q-item-label>
            <q-item-label caption>@Kittybox</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'
import SinglePost from '../components/SinglePost.vue'
import SkeletonPost from '../components/SkeletonPost.vue'
import NoPosts from '../components/NoPosts.vue'
export default defineComponent({
  components: { SinglePost, SkeletonPost, NoPosts },
  name: 'PageHome',
  data() {
    return {
      posts: [],
      loadingPosts: false,
    }
  },
  methods: {
    niceDate(value) {
      return date.formatDate(value, 'MMMM DD h:mmA')
    },
    getPosts() {
      this.loadingPosts = true
      // load posts from Heroku server via axios & express
      let heroku = 'https://kitsta-backend.herokuapp.com/posts'
      this.$axios
        .get(`${process.env.API}/posts`)
        .then((response) => {
          this.posts = response.data
        })
        .catch((err) => {
          this.$q.dialog({
            title: 'Error',
            message: 'Data Not Loaded.',
          })
        })
        .finally(() => {
          this.loadingPosts = false
        })
    },
  },
  created() {
    this.getPosts()
  },
})
</script>
<style lang="sass">
.card-post
  .q-img
    min-height:200px
</style>
