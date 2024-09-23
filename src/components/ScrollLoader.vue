<template>
  <div class="scroll-loader">
    <img
      src="https://blog.tourismofkashmir.com/kOnzy.gif"
      alt="Loading..."
      class="loader-image"
    />
  </div>
</template>

<script>
export default {
  name: 'ScrollLoader',
};
</script>

<style scoped>
.scroll-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.loader-image {
  width: 50px; /* Adjust size as needed */
  height: 50px; /* Adjust size as needed */
}
</style>
