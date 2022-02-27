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
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'
export default defineComponent({
  name: 'PageHome',
  data() {
    return {
      posts: [
        {
          id: 1,
          caption: 'Pic from my kittycation',
          date: 1638727646386,
          location: 'Dolomites',
          imageUrl: 'https://cdn.quasar.dev/img/mountains.jpg',
        },
        {
          id: 1,
          caption: 'Caturday',
          date: 1638727646386,
          location: 'Kittybox',
          imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2a3iiiRFCp1m715iKCVP3eW6X16QcmHm5uw&usqp=CAU',
        },
        {
          id: 1,
          caption: 'Working hard',
          date: 1638727646386,
          location: 'Christmas',
          imageUrl: 'https://i.ytimg.com/vi/3fLGO9aI-bY/maxresdefault.jpg',
        },
      ],
    }
  },
  methods: {
    niceDate(value) {
      return date.formatDate(value, 'MMMM DD h:mmA')
    },
  },
})
</script>
<style lang="sass">
.card-post
  .q-img
    min-height:200px
</style>
