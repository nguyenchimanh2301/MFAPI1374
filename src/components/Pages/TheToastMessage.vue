<template>
    <div class="toast--container">
    <!-- <div class="form--toast">
        <div class="toast__icon icon--question"></div>
        <div class="toast--content">Đây là nội dung của toast</div>
        <div class="toast--btn"></div>
    </div>
    <div class="form--toast">
        <div class="toast__icon icon--danger"></div>
        <div class="toast--content">Lỗi</div>
        <div class="toast--btn"></div>
    </div>
    <div class="form--toast">
        <div class="toast__icon icon--warning"></div>
        <div class="toast--content">Cảnh báo</div>
        <div class="toast--btn"></div>
    </div>
    <div class="form--toast">
        <div class="toast__icon icon--info"></div>
        <div class="toast--content">Thông tin</div>
        <div class="toast--btn"></div>
    </div> -->
    <div class="form--toast">
        <div class="toast__icon "
        :class="
        {
            'icon--info': icon == 'info',
            'icon--question': icon == 'question',
            'icon--danger': icon == 'error',
            'icon--warning': icon == 'warning',

        }"></div>
        <div class="toast--content" v-for="(item, index) in errorMsg" :key="index">{{ item }} {{text}}</div>
        <div class="toast--btn"></div>
    </div>
   </div>
</template>

<script>
export default {
    name :"MToast",
    props:{
        text:{
            type: String,
            default: "",
        },
        icon:{
            type: String,
            default: "information",
        },
        errorMsg:{
            type:Array,
            default: ()=> [],
        }
    }
}
</script>