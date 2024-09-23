<template>
  <div id="app">
    <SidebarComponent :isMenuOpen="isMenuOpen" @toggleMenu="toggleMenu" />
    <div class="content-wrapper" :class="{ 'shifted': isMenuOpen }">
      <Header :isMenuOpen="isMenuOpen" @toggleMenu="toggleMenu" />
      <main 
        @touchstart="touchStart" 
        @touchmove="touchMove" 
        @touchend="touchEnd" 
        :style="{ transform: pullDownStyle, transition: pullDownTransition }"
      >
        <transition name="slide-down-up" mode="out-in" appear>
          <router-view :key="$route.path" />
        </transition>
        <div v-if="isRefreshing" class="refresh-indicator">Refreshing...</div>
      </main>
    </div>
    <div class="overlay" v-if="isMenuOpen" @click="toggleMenu"></div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import SidebarComponent from './components/SidebarComponent.vue';

export default {
  name: 'App',
  components: {
    Header,
    SidebarComponent,
  },
  data() {
    return {
      isMenuOpen: false,
      isRefreshing: false,
      startY: 0,
      pullDownOffset: 0,
      isPulling: false,
      pullDownTransition: 'none', // Initialize without transition
    };
  },
  computed: {
    pullDownStyle() {
      return `translateY(${this.pullDownOffset}px)`; // Apply the pull-down offset
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    touchStart(event) {
      this.startY = event.touches[0].clientY;
      this.pullDownOffset = 0; // Reset offset on touch start
      this.isPulling = false;
      this.pullDownTransition = 'none'; // Disable transition on touch start
    },
    touchMove(event) {
      const currentY = event.touches[0].clientY;
      const distance = currentY - this.startY;

      // Only allow pulling down if the user is at the top of the content
      if (distance > 50 && !this.isRefreshing) { // Threshold to detect pull-down
        this.isPulling = true;
        this.pullDownOffset = distance; // Update offset for visual effect
        this.pullDownTransition = 'transform 0.2s ease'; // Set smooth transition
        event.preventDefault(); // Prevent default behavior to stop scrolling
      }
    },
    touchEnd() {
      if (this.isPulling) {
        this.refresh();
      } else {
        this.resetPullDown();
      }
      this.isPulling = false;
      this.pullDownTransition = 'transform 0.2s ease'; // Smooth transition back
    },
    resetPullDown() {
      this.pullDownOffset = 0; // Reset offset if not pulling
    },
    refresh() {
      this.isRefreshing = true;
      // Simulate a refresh operation
      setTimeout(() => {
        this.isRefreshing = false;
        this.resetPullDown(); // Reset offset after refresh
      }, 2000); // Simulated refresh duration
    },
  },
};
</script>

<style>
/* Add styles for refresh indicator */
.refresh-indicator {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
  z-index: 10; /* Ensure it's above the content */
}

.content-wrapper {
  transition: transform 0.3s ease; /* Use transform for smoother shifts */
}

.content-wrapper.shifted {
  transform: translateX(250px); /* Match this to sidebar width */
  margin-left: 10px; 
}

/* Prevents overflow during animation */
#app {
  overflow: hidden; 
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.0);
  z-index: 8; /* Below sidebar, above content */
  transition: opacity 0.3s ease;
}

.slide-down-up-enter-active,
.slide-down-up-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-down-up-enter {
  opacity: 0;
  transform: translateY(20px);
}

.slide-down-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
