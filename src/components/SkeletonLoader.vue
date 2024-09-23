<template>
  <div class="skeleton-container">
    <div v-for="index in 10" :key="index" class="card skeleton-card">
      <div class="skeleton-image"></div>
      <div class="card-content">
        <div class="skeleton-title"></div>
        <div class="skeleton-content"></div>
        <div class="skeleton-meta">
          <div class="skeleton-avatar"></div>
          <div class="skeleton-username"></div>
          <div class="skeleton-date"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonLoader',
};
</script>

<style scoped>
.skeleton-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.skeleton-card {
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.skeleton-image {
  width: 100%;
  height: 180px;
  background: #e0e0e0;
  border-radius: 4px;
}

.card-content {
  margin-top: 12px;
}

.skeleton-title,
.skeleton-content,
.skeleton-username,
.skeleton-date {
  background: #e0e0e0;
  border-radius: 4px;
}

.skeleton-title {
  width: 60%;
  height: 20px;
  margin-bottom: 8px;
}

.skeleton-content {
  width: 100%;
  height: 16px;
  margin-bottom: 8px;
}

.skeleton-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.skeleton-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #e0e0e0;
}

.skeleton-username,
.skeleton-date {
  width: 40%;
  height: 16px;
}
</style>
