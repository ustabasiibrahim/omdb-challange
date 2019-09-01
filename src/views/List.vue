<template>
  <div class="container">
      <header class="header">
        <div class="header__wrapper">
          <router-link to="/" class="logo">
            <img src="@/assets/img/logo.png" alt="Logo" class="logo--img">
          </router-link>
          <div class="category">
            <div class="category__item">
              <button class="category__button" type="button" :class="{ active: filterActive }"@click="filterActive = !filterActive">
                <span class="category__button--txt">Kategori</span>
                <span class="category__button--icon">
                  <svg class="icon">
                    <use xlink:href="@/assets/img/icons.svg#icon-expand-more"></use>
                  </svg>
                </span>
              </button>
            </div>
            <transition name="fade">
              <div class="category__filter" v-if="filterActive">
                <input id="series" type="radio" name="numbers" value="series" v-model="movieType"
                       @change="searchMovie">
                <label for="series">Series</label>
                <input id="movies" type="radio" name="numbers" value="movie" v-model="movieType"
                       @change="searchMovie">
                <label for="movies">Movies</label>
              </div>
            </transition>
          </div>
          <div class="search">
            <input type="text" class="search__input" placeholder="Search" @keyup.enter="searchMovie"
                   v-model="movieTitle">
          </div>
          <div class="sort">
            <span class="sort__txt">Sıralama</span>
            <div class="sort__select">
              <select class="sort__select--listing" v-model="movieSort" @change="sortBy">
                <option value="ASC">Yıla Göre Artan</option>
                <option value="DESC">Yıla Göre Azalan</option>
              </select>
            </div>
          </div>
        </div>
      </header>

    <div class="card__list">
      <Card :item="item" v-for="item in items" :key="item.key"/>
    </div>
    <div class="more" v-if="items.length >= 10">
      <button class="more__button" type="button" @click="loadMore" :disabled="busy">
        <span v-if="!busy">Daha Fazla İçerik</span>
        <span v-else>Yükleniyor...</span>
      </button>
    </div>
  </div>
</template>

<script>
  import Card from '@/components/Card.vue';

  export default {
    components: { Card },
    name: 'home',
    data() {
      return {
        movieTitle: null,
        movieType: null,
        movieSort: 'ASC',
        filterActive: false,
        items: [],
        page: 1,
        busy: false,
      };
    },
    methods: {
      searchMovie() {
        if (this.movieTitle) {
          this.axios.get('', {
            params: {
              s: this.movieTitle,
              type: this.movieType,
            }
          })
            .then((response) => {
              this.items = response.data.Search;
            })
            .catch((e) => {
              console.log(e);
            });
        }
      },
      sortBy() {
        if (this.movieSort == 'DESC') {
          return this.items.sort((a, b) => new Date(b.Year) - new Date(a.Year));
        } else {
          return this.items.sort((a, b) => new Date(a.Year) - new Date(b.Year));
        }
      },
      loadMore() {
        this.busy = true;
        console.log('Adding 10 more data results');
        this.page += 1;
        this.axios.get('', {
          params: {
            s: this.movieTitle,
            type: this.movieType,
            page: this.page
          }
        })
          .then((response) => {
            response.data.Search.forEach(el => {
              this.items.push(el);
            });
            this.busy = false;
          })
          .catch((e) => {
            console.log(e);
            this.busy = false;
          });
      },
    },
  };
</script>
<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
