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
import { date } from 'quasar';
import { defineComponent } from 'vue';
import { fireDB } from '../boot/firebase.js';
export default defineComponent({
  name: 'SinglePost',
  props: {
    post: Object,
    name: String,
  },
  created() {},
  data() {
    return {};
  },
  methods: {
    niceDate(value) {
      console.log('fired');
      const dat = date.formatDate(value, 'MMMM DD h:mmA');
      console.log('date', dat);
      // return date.formatDate(value, 'MMMM DD h:mmA')
      return dat;
    },
    deletePost() {
      console.log('floo', this.niceDate(1645895709399));
      console.log(this.post.id);
      if (window.confirm('Do you really want to delete?')) {
        fireDB
          .collection('posts')
          .doc(this.post.id)
          .delete()
          .then(() => {
            this.$q.dialog({
              title: 'Succes!',
              message: 'Post Deleted.',
            });
          })
          .catch((error) => {
            this.$q.dialog({
              title: 'Error',
              message: 'Delete Failed.',
            });
          });
      }
    },
  },
});
</script>

<style lang="sass"></style>
