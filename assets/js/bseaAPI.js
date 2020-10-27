// 开发测试地址
var basaUIL = 'http://ajax.frontend.itheima.net';
// 
$.ajaxPrefilter(function (params) {
    params.url = basaUIL + params.url

    // 判断值
    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }
})