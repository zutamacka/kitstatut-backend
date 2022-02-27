<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-8">
        <q-card
          v-for="post in posts"
          :key="post.id"
          class="card-post q-mb-md"
          flat
          bordered
        >
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="~assets/MaineCoon.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-bold">Floofster</q-item-label>
              <q-item-label caption>{{ post.location }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />
          <q-img class="my-class" :src="post.imageUrl" />
          <q-card-section>
            <div class="text-body2">{{ post.caption }}</div>
            <div class="text-caption text-grey">
              {{ niceDate(post.date) }}
            </div>
          </q-card-section>
        </q-card>
      </div>
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
    <div class="row small-screen-only q-col-gutter-md">
      <q-item class="bg-light-blue-1">
        <q-item-section avatar>
          <q-avatar size="48px">
            <img src="~assets/MaineCoon.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold">Floofster</q-item-label>
          <q-item-label caption>@Kittybox</q-item-label>
          <q-item-label caption>@Kittybox</q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'
export default defineComponent({
  name: 'PageHome',
  data() {
    return {
      posts: [],
    }
  },
  methods: {
    niceDate(value) {
      return date.formatDate(value, 'MMMM DD h:mmA')
    },
    getPosts() {
      console.log('Getting the posts!')

      this.$axios
        //.get("https://kitsta-backend.herokuapp.com/posts")
        .get('http://localhost:3000/posts')
        .then((response) => {
          console.log('response: ', response)
        })
        .catch((err) => {
          console.log('whoops')
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
