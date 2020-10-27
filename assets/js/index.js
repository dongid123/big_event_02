$(function () {
    gitUserInof()
})

// 封装一个全局函数
function gitUserInof() {
    // 使用ajax请求方法
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            // 判断状态获取
            if (res.status !== 0) {
                return layui.layer.msg(res.massage)
            }
            // 请求成功渲染用户头像
            raderAvatar(res.data)
        },

    })
}

// 选渲染头像
function raderAvatar(user) {
    // 渲染用户名
    var name = user.nickname || user.username
    // 从页面上获取的用户民渲染到页面上
    $("#user_name").html('欢迎&nbsp;&nbsp;' + name)
    // 渲染图片
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.user-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var fist = name[0].toUpperCase()
        $('.user-avatar').show().html(fist)
    }


}