<template>
  <q-card class="card-post q-mb-md" flat bordered>
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
      <div class="text-body2 row">
        <div class="col-11">
          {{ post.caption }}
        </div>
        <div class="col-1">
          <q-btn
            flat
            round
            class="q-pa-xs"
            color="secondary"
            icon="delete"
            @click="deletePost"
          />
        </div>
      </div>
      <div class="text-caption text-grey row">
        {{ niceDate(post.date) }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { date } from 'quasar'
import { defineComponent } from 'vue'
//import { fireDB } from '../boot/firebase.js';
export default defineComponent({
  name: 'SinglePost',
  props: {
    post: Object,
    name: String,
  },
  created() {},
  data() {
    return {}
  },
  methods: {
    niceDate(value) {
      return date.formatDate(value, 'MMMM DD h:mmA')
    },
    deletePost() {
      // this.$q.loading.show({
      //   message: 'Deleting...',
      // })
      console.log(this.post.id)
      this.$axios
        .delete(`${process.env.API}/delete/${this.post.id}`)
        .then((response) => {
          console.log('response', response)
          // send to the Home page after a successful post
          this.$router.push('/')
          // notify about posting
          this.$q.notify({
            message: 'Post deleted.',
            actions: [
              {
                label: 'Dismiss',
                color: 'primary',
              },
            ],
          })
        })
        .catch((err) => {
          console.log('error ', err)
          this.$q.dialog({
            title: 'Error',
            message: 'Deleting failed.',
          })
        })
        .finally(() => {
          // this.$q.loading.hide()
        })
    },
  },
})
</script>

<style lang="sass"></style>
