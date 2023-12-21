<template>
    <input
      :class="{
        'border-error': hasError,
      }"
      type="text"
      :id="inputId"
      v-model="value"
      @input="onInput"
    />
  </template>
  
  <script>
    export default{
    name:"MInput",
    // props:['values','hasError'],
    created(){
         this.value = this.modelValue;
    },
    data() {
        return {
            value :" ",
        }
    },
    methods: {
        onInput(){
            this.$emit("update:modelValue",this.value);
        }
    },
    props: {
      modelValue: {
        type: String,
        required: false,
      },
      inputId: {
      type: String,
      default: ' ',
     },
      hasError: {
        type: Boolean,
        default: false,
      },
    },
  };
  </script>
  
  <style scoped>
    /* Định nghĩa các lớp CSS tùy thuộc vào yêu cầu của bạn */
    .border-error {
      /* CSS của lớp khi có lỗi */
      border: 1px solid red;
    }
  </style>
  

