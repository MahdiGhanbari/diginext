<template>
  <v-app>
    <div class="system-bar d-flex align-center">
      <span class="system-bar__time">{{ time }}</span>
      <v-spacer />
      <v-img src="@/assets/images/signal.svg" width="17" />
      <v-img src="@/assets/images/wifi.svg" width="15" class="system-bar__wifi" />
      <v-img src="@/assets/images/battery.svg" width="24" />
    </div>
    <!-- slot is alternative for the router-view -->
    <router-view />
    <footer class="footer">
      <div class="footer__title">Company</div>
      <div class="footer__links-wrapper d-flex">
        <div>
          <v-btn variant="text" class="footer__link-btn text-capitalize"> About </v-btn>
        </div>
        <div>
          <v-btn variant="text" class="footer__link-btn text-capitalize"> Community </v-btn>
        </div>
      </div>
      <div class="footer__social-accounts d-flex justify-center justif">
        <v-img src="@/assets/images/facebook.svg" width="24"/>
        <v-img src="@/assets/images/instagram.svg" width="24" class="footer__social-accounts__facebook"/>
        <v-img src="@/assets/images/you-tube.svg" width="24"/>
      </div>
    </footer>
  </v-app>
</template>

<script setup>
import { ref, onUnmounted, onBeforeMount } from 'vue'
import moment from 'moment'

// varibales
const time = ref(moment().format('h:m'))
let interval = null

// hooks
onBeforeMount(()=> {
  interval = setInterval(() => {
    time.value = moment().format('h:m')
  }, 60000)
})
onUnmounted(()=> {
  if(interval) {
    clearInterval(interval)
  }
})
</script>

<style scoped lang="scss">
.system-bar {
  position: fixed;
  z-index: 10000;
  color: white;
  width: 100%;
  height: 44px;
  padding: 14px;
  &__wifi {
    margin-inline: 5px;
  }
  &__time {
    width: 54px;
    text-align: center;
    font-weight: 600;
    font-size: 15px;
  }
  & > * {
    flex-grow: 0;
  }
}
.footer {
  height: 232px;
  background-color: #f7f7fc;
  padding: 40px 24px;
  &__title {
    font-weight: 400;
    font-size: 20px;
    color: #4e4b66;
  }
  &__links-wrapper {
    margin-top: 32px;
    & > * {
      flex: 1;
    }
  }
  &__link-btn {
    padding-inline: 0 !important;
    color: #14142B;
    font-weight: 700;
    font-size: 15px;
  }
  &__social-accounts {
    margin-top: 32px;
    & > * {
      flex-grow: 0;
    }
    &__facebook {
      margin-inline: 40px;
    }
  }
}
</style>