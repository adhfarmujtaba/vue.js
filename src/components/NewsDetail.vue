<template>
  <div ref="topRef">
    <div v-if="loading">
      <div class="loading-skeleton">
        <div class="loading-skeleton-image"></div>
        <div class="loading-skeleton-title"></div>
        <div class="loading-skeleton-meta"></div>
        <div class="loading-skeleton-content"></div>
        <div class="loading-skeleton-related">
          <div class="loading-skeleton-related-item" v-for="index in 3" :key="index">
            <div class="loading-skeleton-related-image"></div>
            <div class="loading-skeleton-related-title"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="container_post" v-else>
      <div class="card_post" v-if="post">
        <img :src="post.image" class="card-img-top news-image" :alt="post.title" />
        <div class="card-body">
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text post-meta">
            <FontAwesomeIcon :icon="['fas', 'eye']" /> {{ formatViews(post.views) }} views •
            <FontAwesomeIcon :icon="['fas', 'calendar-alt']" /> {{ formattedDate }} •
            <FontAwesomeIcon :icon="['fas', 'clock']" /> {{ post.read_time }} min read
          </p>
          <div class="content_post" v-html="post.content"></div>

          <div v-if="relatedPosts.length" class="related-posts">
            <h2>Also Read</h2>
            <div class="related-posts-container">
              <div class="related-post-card" v-for="(relatedPost, index) in relatedPosts" :key="index">
                <div @click="navigateToPost(relatedPost)" class="image-container" style="cursor: pointer;">
                  <img :src="relatedPost.image" :alt="relatedPost.title" />
                  <div class="related_read-time-overlay">{{ relatedPost.read_time }} min read</div>
                </div>
                <div class="post-details">
                  <h3 class="post-title">{{ truncateTitle(relatedPost.title) }}</h3>
                  <p class="post-excerpt">{{ relatedPost.excerpt }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="post-category">
            <strong>Category:</strong> {{ post.category_name }}
          </div>
          <div v-if="post.tag_slugs">
            <strong>Tags:</strong>
            <span v-for="(tagSlug, index) in post.tag_slugs.split(',')" :key="index">
              <router-link :to="'/tags/' + tagSlug" class="tag-link">
                <span class="tag">{{ post.tag_names.split(',')[index].trim() }}</span>
              </router-link>
              <span v-if="index < post.tag_slugs.split(',').length - 1">, </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!loading && topViewedPosts.length" class="you-might-like outside-container">
      <h2>You Might Like</h2>
      <div class="top-viewed-posts-container">
        <div class="top-viewed-post-card" v-for="(topViewedPost, index) in topViewedPosts" :key="index">
          <router-link :to="`/${topViewedPost.category_slug}/${topViewedPost.slug}`" class="card-link">
            <div class="image-container">
              <img :src="topViewedPost.image" :alt="topViewedPost.title" class="top-viewed-post-image" />
              <div class="read-time-overlay">{{ topViewedPost.read_time }} min read</div>
            </div>
            <div class="text-container">
              <h3 class="top-viewed-post-title">{{ truncateTitle(topViewedPost.title) }}</h3>
              <p class="top-viewed-post-category">{{ topViewedPost.category_name }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './NewsDetail.css'; // Adjust the path as needed

export default {
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const topRef = ref(null);
    const post = ref(null);
    const relatedPosts = ref([]);
    const topViewedPosts = ref([]);
    const loading = ref(true);
    const route = useRoute();
    const router = useRouter();

    const fetchPost = async () => {
      const postSlug = route.params.slug;
      loading.value = true;
      try {
        const response = await axios.get(`https://blog.tourismofkashmir.com/apis?post_slug=${postSlug}`);
        post.value = response.data;
        updateMetaTags();
        await fetchRelatedPosts();
        await fetchTopViewedPosts();
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        loading.value = false;
      }
    };

    const fetchRelatedPosts = async () => {
      if (post.value && post.value.category_name) {
        loading.value = true;
        try {
          const response = await axios.get(`https://blog.tourismofkashmir.com/related_api.php?related_posts=${post.value.category_name}&exclude_post_id=${post.value.id}`);
          relatedPosts.value = response.data;
        } catch (error) {
          console.error("Error fetching related posts:", error);
        } finally {
          loading.value = false;
        }
      }
    };

    const fetchTopViewedPosts = async () => {
      if (post.value) {
        loading.value = true;
        try {
          const response = await axios.get(`https://blog.tourismofkashmir.com/related_api.php?topviewpost=true&exclude_post_id=${post.value.id}`);
          topViewedPosts.value = response.data;
        } catch (error) {
          console.error("Error fetching top viewed posts:", error);
        } finally {
          loading.value = false;
        }
      }
    };

const updateMetaTags = () => {
  if (post.value) {
    const title = post.value.title;
    const description = post.value.excerpt || post.value.content.substring(0, 150);
    const image = post.value.image;
    const url = window.location.href; // Use the current window URL

    // Set the image dimensions (you may need to adjust these values)
    const imageWidth = 1200; // Replace with actual width if needed
    const imageHeight = 630; // Replace with actual height if needed

    document.title = title;
    document.querySelector('meta[name="description"]').setAttribute('content', description);
    document.querySelector('meta[property="og:title"]').setAttribute('content', title);
    document.querySelector('meta[property="og:description"]').setAttribute('content', description);
    document.querySelector('meta[property="og:image"]').setAttribute('content', image);
    document.querySelector('meta[property="og:image:width"]').setAttribute('content', imageWidth);
    document.querySelector('meta[property="og:image:height"]').setAttribute('content', imageHeight);
    document.querySelector('meta[property="og:url"]').setAttribute('content', url); // Set the URL meta tag
  }
};



    const formatViews = (views) => {
      if (views >= 10000000) return Math.floor(views / 10000000) + 'cr';
      if (views >= 1000000) return Math.floor(views / 1000000) + 'M';
      if (views >= 100000) return Math.floor(views / 100000) + 'L';
      if (views >= 1000) return Math.floor(views / 1000) + 'k';
      return views.toString();
    };

    const truncateTitle = (title, maxLength = 50) => {
      return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
    };

    const navigateToPost = async (relatedPost) => {
      await router.push(`/${relatedPost.category_slug}/${relatedPost.slug}`);
      await fetchPost(); // Fetch the new post after navigating
    };

    onMounted(() => {
      fetchPost();
    });

    watch(() => route.params.slug, () => {
      post.value = null; // Clear current post while loading new one
      fetchPost(); // Fetch the new post
    });

    return {
      topRef,
      post,
      relatedPosts,
      topViewedPosts,
      loading,
      formatViews,
      truncateTitle,
      navigateToPost,
    };
  },
};
</script>

