// 入口函数
$(function () {
    // 获取框架的表单
    var form = layui.form
    // console.log(form);
    //获取用户数据
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户的昵称要在1-6位数之间'
            }
        }
    })
    var layer = layui.layer
    intnUserInfo()
    // 获取用户信息的验证
    function intnUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 获取成功的时候返回
                // layer.msg(res.message)
                form.val('formUserInfo', res.data)
            }
        })
    }

    //表单重置 
    $('#btnReset').on('click', function (e) {
        //阻止默认事件 
        e.preventDefault()
        intnUserInfo()
    })

    // 修改用户的基本数据
    $('.layui-form').on('submit', function (e) {
        //阻止默认的表单事件
        e.preventDefault()
        // 使用ajax接口
        $.ajax({
            type: "POST",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    // 获取失败之后的返回值
                    return layer.msg(res.message)
                }
                // 修改成功之后返回
                layer.msg(res.message)
                // //执行成功之后 
                // console.log(res);
                // 获取成功之后重新渲染
                window.parent.gitUserInof()
            }
        })

    })
})