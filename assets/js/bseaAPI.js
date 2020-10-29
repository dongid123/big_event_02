// 开发测试地址
var basaUIL = 'http://ajax.frontend.itheima.net';
// 
$.ajaxPrefilter(function (params) {
    params.url = basaUIL + params.url

    // 接口信息的判断是否是my的
    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }
    // 全局统一挂载 complete 回调函数
    params.complete = function (res) {
        // 身份认证失败！
        console.log(res.responseJSON);
        var obj = res.responseJSON
        if (obj.status === 1 && obj.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html'
        }
    }
})