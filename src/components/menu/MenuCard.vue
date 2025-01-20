<template>
  <div class="menu-card">
    <img :src="item.imageUrl" :alt="item.name" class="menu-image" />
    <div class="menu-info">
      <h4 class="menu-name">{{ item.name }}</h4>
      <p class="menu-price">{{ formatPrice(item.price) }}</p>
      <p class="menu-desc">{{ item.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuCard',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatPrice(price) {
      return `${price.toLocaleString()} 원`
    }
  }
}
</script>

<style scoped>
.menu-card {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: box-shadow 0.3s ease;
}

.menu-card:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.menu-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}

.menu-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.menu-name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: bold;
}

.menu-price {
  margin: 0;
  color: #888;
  font-weight: 600;
}

.menu-desc {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.4;
}
</style>