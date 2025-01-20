<template>
    <div class="map-section">
      <h3>{{ title }}</h3>
      <p class="address">📍 {{ address }}</p>
      <div class="map-box">
        <!-- 실제론 네이버 지도, 카카오 지도, 구글 지도를 iframe 또는 SDK로 삽입 -->
        <!-- 여기서는 예시로 간단한 div 박스만 넣어둠 -->
        <div class="fake-map">
          <p>여기에 지도가 표시될 예정입니다.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MapSection',
    props: {
      title: {
        type: String,
        default: 'Our Location'
      },
      address: {
        type: String,
        default: '서울특별시 어디어디... (예시)'
      }
    }
  }
  </script>
  
  <style scoped>
  .map-section {
    margin-top: 20px;
  }
  .address {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .map-box {
    height: 300px;
    width: 100%;
    border: 1px solid #ccc;
    position: relative;
  }
  .fake-map {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eee;
    height: 100%;
    color: #666;
    font-style: italic;
  }
  </style>
  