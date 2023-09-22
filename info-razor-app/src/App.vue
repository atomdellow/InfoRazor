<template>
  <div class="container mt-3">
    <div v-if="texts.length === 0" class="text-center">No texts available</div>
    <div class="row">
      <TextCard v-for="text in texts" :key="text._id" :text="text" @open-modal="openModal" />
    </div>
    <b-modal v-model="showModal" title="Text Details">
      <p>{{ selectedText.text }}</p>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import TextCard from './components/TextCard.vue';

export default {
  components: {
    TextCard
  },
  data() {
    return {
      texts: [],
      showModal: false,
      selectedText: {}
    };
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3000/get-texts');
      this.texts = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  methods: {
    openModal(text) {
      this.selectedText = text;
      this.showModal = true;
    }
  }
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';
</style>
