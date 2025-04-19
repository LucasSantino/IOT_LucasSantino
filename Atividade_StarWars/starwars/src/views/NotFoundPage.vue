<script setup lang="ts">
</script>

<template>
  <main>
    <img class="background-image" src="@/images/starwars_notpagefound.jpg" alt="Not Found Background" />
    <div class="content">
      <h1>404 Page not Found!</h1>
      <p>A página que você procura não existe...</p>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;
  max-width: 600px;
  width: 90%;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  color: #ffd700;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.5;
  }

  @media (max-width: 500px) {
    h1 {
      font-size: 1.8rem;
    }

    p {
      font-size: 1rem;
    }
  }
}
</style>
