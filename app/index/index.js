import Vue from 'Vue';
import RenderHome from './home/RenderHome.vue';
Vue.config.debug = true; //开启错误提示
window.onload = function() {
    new Vue({
        render(h) {
            return h(RenderHome); // 开启运行时编译
        }
    }).$mount('#app');
    console.log('vue')
}