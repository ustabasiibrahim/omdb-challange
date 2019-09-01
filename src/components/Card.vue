<template>
    <router-link :to="{ name: 'detail', params: { id: item.imdbID }}" class="card">
      <img :src="posterPath" alt="" class="card__img">
      <div class="card__overlay">
        <div class="card__rating card__overlay--item">
          <span class="card__rating--icon">
            <svg class="icon">
              <use xlink:href="@/assets/img/icons.svg#icon-star"></use>
            </svg>
          </span>
          <span class="card__rating--txt">8.5</span>
        </div>
        <div class="card__name card__overlay--item">{{ item.Title }}</div>
        <p class="card__explore card__overlay--item">Keşfet</p>
      </div>
    </router-link>
</template>

<script>
  export default {
    name: 'Card',
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    computed: {
      posterPath() {
        if(this.item.Poster == "N/A") {
          return "https://www.valmorgan.com.au/wp-content/uploads/2016/06/default-movie-1-3.jpg";
        }else {
          return this.item.Poster
        }
      }
    },
  };
</script>

<style scoped>

</style>
