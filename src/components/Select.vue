<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    selectedIndex: {
      type: Number,
      required: false,
      default: 0,
    },
    onChange: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      open: false,
    }
  },
  methods: {
    handleChange(index) {
      this.onChange(index)
      this.open = false
    },
  },
}
</script>

<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div :class="{
      selected: true,
      open,
    }" @click="open = !open">
      {{ options[selectedIndex] }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="handleChange(i)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-select {
  position: relative;
  width: 200px;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;
}

.custom-select .selected {
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #666666;
  color: #000;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select:focus .selected {
  border: 1px solid #098d6e;
  border-radius: 6px;
}

.custom-select:focus .selected.open {
  border-radius: 6px 6px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #000 transparent transparent transparent;
}

.custom-select .items {
  color: #000;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid #098d6e;
  border-left: 1px solid #098d6e;
  border-bottom: 1px solid #098d6e;
  position: absolute;
  background-color: #fff;
  left: 0;
  right: 0;
  z-index: 1;
}

.custom-select .items div {
  color: #000;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: #098d6e;
}

.selectHide {
  display: none;
}
</style>