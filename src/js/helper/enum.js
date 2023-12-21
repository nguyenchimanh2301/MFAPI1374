const MISAEnum = {
    method:{
        ADD:0,
        UPDATE:1
    },
    Gender:{
        MALE :0,
        FEMALE:1,
        OTHER:2,
    },
    EN:{

    },
    GenderName(gender){
       if(gender===0){
          return "Nam";
       }
       if(gender===1){
        return "Nữ";
       }
       else{
        return "Khác";
       }
    }
}
 
export default  MISAEnum
