import {  createApp } from 'vue'
import App from './App.vue'

import excel from 'vue-excel-export'

 import TheToastMessage from './components/Pages/TheToastMessage.vue';
 import MInput from './components/Pages/MInput.vue';
 import MLoader from './components/Pages/MLoader.vue';
 import TheDialog from './components/Pages/TheDialog.vue';
 import TheContent from './components/Pages/TheContent.vue';

import MISAResource from './js/helper/resource';
import TheEmployee from './components/Pages/MainComponent/TheEmployee.vue';
import TheSetting from './components/Pages/MainComponent/TheSetting.vue';
import TheReport from './components/Pages/MainComponent/TheReport.vue';
import  axios  from 'axios';
import MISAEnum from './js/helper/enum';
import { createRouter , createWebHistory } from 'vue-router';

const routes = [
 {path:'/employee', name:'employee' , component:TheEmployee},
 {path:'/setting', name:'setting' , component:TheSetting},
 {path:'/report', name:'report' , component:TheReport},
 {path:'/', name:'customer' , component:TheContent},

]

 const router = createRouter({
    history :createWebHistory(),
    routes,

 })


const app = createApp(App);
app.component("MToast",TheToastMessage)
app.component("MInput",MInput)
app.component("MLoader",MLoader)
app.component("the-dialog",TheDialog)
app.component("the-employee",TheEmployee)
app.component("the-setting",TheSetting)
app.component("the-report",TheReport)

app.use(excel)
app.use(router);
app.config.globalProperties.api = axios;
app.config.globalProperties.MISAEnum = MISAEnum;
app.config.globalProperties.MISAResource = MISAResource;
app.config.globalProperties.MISAapi = "https://localhost:7096/api/v1/Customers";


app.mount('#app')
