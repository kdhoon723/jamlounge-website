<template>
    <div class="gallery-item">
      <img :src="image.url" :alt="image.desc" class="gallery-image" @click="onClick" />
      <p v-if="showDescription" class="gallery-desc">{{ image.desc }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GalleryItem',
    props: {
      image: {
        type: Object,
        required: true
      },
      showDescription: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onClick() {
        // 예시: 클릭 시 확대 모달 표시 가능
        // 여기서는 단순히 콘솔로그만 찍음
        console.log('Clicked on gallery item:', this.image.desc)
      }
    }
  }
  </script>
  
  <style scoped>
  .gallery-item {
    position: relative;
    cursor: pointer;
  }
  .gallery-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 4px;
    transition: opacity 0.3s ease;
  }
  .gallery-image:hover {
    opacity: 0.8;
  }
  .gallery-desc {
    margin-top: 8px;
    font-size: 0.9rem;
    color: #444;
  }
  </style>
  