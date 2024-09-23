<template>
  <div>
    <header class="header">
      <div class="menu-icon" @click="toggleMenu">
        <span :class="{ 'active': isMenuOpen }"></span>
        <span :class="{ 'active': isMenuOpen }"></span>
        <span :class="{ 'active': isMenuOpen }"></span>
      </div>
      <router-link 
        to="/" 
        class="logo" 
  :class="{ visible: !isMenuOpen, hidden: isMenuOpen }"
      >
         <img src="@/assets/logo.png" alt="Leak News" /> <!-- Adjust the path as needed -->
    
             <span>Leak News</span>
      </router-link>
      <div class="icons">
        <div class="icon" @click="handleNotificationClick">
          <i class="fas fa-bell"></i>
        </div>
        <div class="icon" @click="handleSearchClick">
          <i class="fas fa-search"></i>
        </div>
        <div class="icon" @click="handleUserClick">
          <i class="fas fa-user"></i>
        </div>
      </div>
    </header>

    <!-- Category Tags Section -->
    <div class="category-tags">
      <template v-if="!loadingCategories">
        <router-link 
          to="/" 
          class="category-tag" 
          :class="{ active: isActive('/') }"
        >
          All
        </router-link>
      </template>
      
      <template v-if="loadingCategories">
        <div class="category-tags-loading">
          <div class="loading-tag" style="width: 50px; height: 35px;"></div>
          <div class="loading-tag" style="width: 120px; height: 35px;"></div>
          <div class="loading-tag" style="width: 90px; height: 35px;"></div>
          <div class="loading-tag" style="width: 110px; height: 35px;"></div>
          <div class="loading-tag" style="width: 120px; height: 35px;"></div>
          <div class="loading-tag" style="width: 100px; height: 35px;"></div>
        </div>
      </template>
      
      <template v-else>
        <router-link 
          v-for="category in categories" 
          :key="category.id" 
          :to="`/${category.slug}`" 
          class="category-tag" 
          :class="{ active: isActive(`/${category.slug}`) }"
        >
          {{ category.name }}
        </router-link>
      </template>
    </div>
    
    <!-- Commented out overlay -->
    <!-- <div class="overlay" :class="{ 'active': isMenuOpen }" @click="toggleMenu"></div> -->
  </div>
</template>


<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'HeaderComponent',
  props: {
    isMenuOpen: Boolean,
  },
  data() {
    return {
      categories: [],
      loadingCategories: true,
    };
  },
  computed: {
    ...mapState(['currentRoute']),
  },
  methods: {
    toggleMenu() {
      this.$emit('toggleMenu');
    },
    handleNotificationClick() {},
    handleSearchClick() {},
    handleUserClick() {},
    async fetchCategories() {
      this.loadingCategories = true;
      try {
        const response = await axios.get('https://blog.tourismofkashmir.com/apis?categories&order_index=asc&header_menu_is_included=TRUE');
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        this.loadingCategories = false;
      }
    },
    isActive(route) {
      return this.$route.path === route;
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>



<style scoped>
.header {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 10px 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
}

.menu-icon {
  cursor: pointer;
  position: relative;
  width: 30px;
  margin-right: 15px;
  margin-left: 4px;
  height: 20px;
}

.menu-icon span {
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: #333;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.menu-icon span:nth-child(1) {
  top: 0;
}

.menu-icon span:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.menu-icon span:nth-child(3) {
  bottom: 0;
}

.menu-icon span.active:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-icon span.active:nth-child(2) {
  opacity: 0;
}

.menu-icon span.active:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}


.logo {
  display: flex; /* Flex for logo alignment */
  align-items: center; /* Center vertically */
  text-decoration : none;
}

.icons {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.icon {
  font-size: 20px;
  margin-left: 20px;
  cursor: pointer;
  transition: color 0.3s;
}

.icon:hover {
  color: #007bff;
}



.category-tags {
  display: flex;
  overflow-x: auto; /* Enable horizontal scrolling */
  padding: 10px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd; /* Add a subtle bottom border */
  white-space: nowrap; /* Prevent wrapping */
}

.category-tag {
  margin: 5px;
  padding: 8px 16px; /* Increased padding for better touch targets */
  border-radius: 20px; /* More rounded corners */
  background-color: #e2e6ea;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.2s; /* Added transform for effect */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

.category-tag:hover {
  background-color: #0056b3; /* Darker shade for hover */
  color: #fff;
  transform: scale(1.05); /* Slightly scale up on hover */
}

.category-tag.active {
  background-color: #007bff; /* Active tag background */
  color: #fff; /* Active tag text color */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Enhanced shadow for active tag */
}

/* Optional: Hide scrollbar for a cleaner look */
.category-tags::-webkit-scrollbar {
  display: none; /* Hide scrollbar for a cleaner appearance */
}
.category-tags-loading {
  display: flex;
  padding: 5px;
}

.loading-tag {
  background-color: #e2e6ea;
  border-radius: 20px; /* Rounded corners */
  margin: 0 5px; /* Space between tags */
  animation: pulse 1.5s infinite; /* Pulse animation */
}

@keyframes pulse {
  0% {
    background-color: #e2e6ea;
  }
  50% {
    background-color: #d0d0d0; /* Slightly darker shade */
  }
  100% {
    background-color: #e2e6ea;
  }
}
.logo {
  position: relative; /* Ensure it can be moved */
  
}

.hidden {
  transform: translateX(-100%); /* Slide to the left */
  opacity: 0; /* Fade out */
}

.visible {
  transition: transform 1.2s , opacity 1s ease; /* Set to 1 second */
  
}

.logo img {
  width: 40px; /* Adjust logo size */
  height: auto; /* Maintain aspect ratio */
  margin-right: 10px; /* Space between logo and text */
}
.logo span {
  font-size: 24px;
  font-weight: 600;
  color: #343a40; /* Darker title color */
}
</style>
