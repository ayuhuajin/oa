module.exports = {
    proxy: {
        '/apis': {  //将www.exaple.com印射为/apis
            target: 'http://xmoa.weicoms.com', // 接口域名
            changeOrigin: true, //是否跨域
            pathRewrite: {
            '^/apis': '/apis'  //需要rewrite的,
            }       
        }
    }
}

// http://jspang.com/DemoApi/oftenGoods.php

// http://xmoa.weicoms.com/Login/MobileCheckLogin