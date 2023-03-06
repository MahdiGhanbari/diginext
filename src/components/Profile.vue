<template>
  <div class="d-flex">
    <v-avatar size="48" class="avatar">
      <v-img src="@/assets/images/user_profile_ex.png"/>
    </v-avatar>
    <div class="content">
      <div class="content__name">{{ name }}</div>
      <div class="content__create-time">{{ moment(date).format('HH:MM A, ddd') }}</div>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment'
defineProps({
  name: String,
  date: Date
})
</script>

<style scoped lang="scss">
.content {
  margin-inline-start: 14px;
  &__name {
    font-weight: 600;
    color: #4E4B66;
  }
  &__create-time {
    font-weight: 500;
    color: #A0A3BD;
  }
  &__name,
  &__create-time {
    font-size: 13px;
    line-height: 22px;
    letter-spacing: 0.25px;
  }
}
</style>