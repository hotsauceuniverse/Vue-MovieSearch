<template>
  <div 
    :style="{width: `${size}rem`, height: `${size}rem`, zIndex}"
    :class="{ absolute, fixed }"
    class="spinner-border text-primary"></div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 2
    },
    absolute: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number, 
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.spinner-border {
  margin: auto;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0; // position값이 있을 때, 가운데 배치 용도
  &.absolute {
    position: absolute;
  }
  &.fixed {
    position: fixed;
  }
} 
</style>