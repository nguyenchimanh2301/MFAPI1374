<template>
    <div class="dialog--background" >
    <div class="dialog">
        <div class="dialog--title">
            <h3>{{ titleDialog }} DỮ LIỆU</h3>
            <div class="toast--btn"></div>
        </div>
       <div class="dialog--content">
        <div class="toast__icon " 
        :class="{
        'icon--question': type =='question',
        'icon--warning': type =='warning',
        'icon--danger': type =='error',
        'icon--info': type =='info',
        }"></div>
        <div class="dialog--text">Bạn có chắc muốn <p style="color: red;">{{ titleDialog }}</p> {{text}}?</div>
       </div>
       <div class="dialog__btn">
        <button class="button btn--cancel" id="closedialog" @click="hideDlg">Hủy</button>
        <button class="button btn-main" @click="addData">Đồng Ý</button>
       </div>
    </div> 
</div>
</template>
<script>
export default{
   name :"the-dialog",
   props:{
    title:{
        type : String,
        default : " ",
        required : true
      },
      customerIdRemove:{
        type : Object,
        default : ()=> {},
        required : true
      },
      type:{
        type : String,
        default : "question",
        required : true
      }
   },
   created(){
      this.titleDialog = this.title;
      this.customerId = this.customerIdRemove;
      if(this.titleDialog!=='Xóa'){
        this.text = "Không";
      }
       else{
            this.text = this.customerId.FullName;
      }
   },
   mounted(){

   },
   methods:{
    hideDlg(){
       this.$emit('hideDlg');
    },
    addData(){
        
       if(this.titleDialog==='Xóa'){
        this.$emit('removeData', this.customerId.CustomerId);
       }
       else{
        this.$emit('addData');
       }
    },
    data() {
        return {
            titleDialog: '',
            customerId  :{},
            text : ""
        }
    },
   }    
   
}
</script>
