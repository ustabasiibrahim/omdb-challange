<template>
  <div class="movie">
    <header class="header-subpage">
      <div class="container">
        <div class="header__wrapper">
          <router-link to="/" class="logo">
            <img src="@/assets/img/logo.png" alt="Logo" class="logo--img">
          </router-link>
        </div>
      </div>
    </header>
    <div class="container">
      <div class="movie__content">
        <div class="movie__poster">
          <img :src="movie.Poster" alt="Poster" class="movie__poster--img">
        </div>
        <div class="movie__detail">
          <h3 class="movie__title movie__detail--item">{{ movie.Title }}</h3>
          <div class="movie__info movie__detail--item">
              <p class="movie__info--item">{{ movie.Year }}</p>
              <p class="movie__info--item">{{ movie.Runtime }}</p>
              <p class="movie__info--item">{{ movie.Country }}</p>
              <p class="movie__info--item">{{ movie.Language }}</p>
          </div>
          <p class="movie__description movie__detail--item">{{ movie.Plot }}</p>
          <router-link class="movie__website" :to="movie.Website">Web Sitesine Git</router-link>
        </div>
        <router-link class="back-home" to="/"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Detail',
    data() {
      return {
        id: this.$route.params.id,
        movie: {},
      };
    },
    created() {
      this.axios.get('', { params: { i: this.id } })
        .then((response) => {
          console.log(response.data)
          this.movie = response.data;
        }).catch((e) => {
          console.log(e);
      });
    }
  }
</script>
