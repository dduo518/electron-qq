<template id="template-home">
  <div>
    <Tabbar></Tabbar>
    

  </div>
</template>
<script>
import Tabbar from '../components/tabbar'
export default{
    components:{
        Tabbar
    }
}
</script>
<style lang="less">
@import "../styles/mod/normalize.css";
html,body{
    height:100%;
    width:100%;
}
body {
    color: red;
    background:#FFF;
    font-size:20px;
}
</style>