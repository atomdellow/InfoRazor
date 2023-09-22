<template>
  <div class="card mb-3" @click="openModal(text)">
    <div class="card-body">
      <h5 class="card-title">{{ text.category }}</h5>
      <p class="card-text">{{ text.text.substring(0, 100) }}...</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    openModal(text) {
      this.$emit('open-modal', text);
    }
  }
}
</script>

<style scoped>
.card {
  cursor: pointer;
}
</style>
