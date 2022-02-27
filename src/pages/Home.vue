<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-md">
      <template v-if="!loadingPosts">
        <div class="col-12 col-sm-8">
          <single-post v-for="post in posts" :key="post.id" :post="post" />
        </div>
      </template>
      <template v-else>
        <div class="q-pa-md">
          <q-card flat bordered style="max-width: 500px">
            <q-item>
              <q-item-section avatar>
                <q-skeleton type="QAvatar" animation="fade" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-skeleton height="200px" square animation="fade" />

            <q-card-section>
              <q-skeleton type="text" class="text-subtitle2" animation="fade" />
              <q-skeleton
                type="text"
                width="50%"
                class="text-subtitle2"
                animation="fade"
              />
            </q-card-section>
          </q-card>
        </div>
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
export default defineComponent({
  components: { SinglePost },
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
      this.$axios
        .get('https://kitsta-backend.herokuapp.com/posts')
        .then((response) => {
          this.posts = response.data
        })
        .catch((err) => {
          console.log('whoops')
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
