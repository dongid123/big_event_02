// 入口函数
$(function () {

    var form = layui.form
    // 密码的验证
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 原密码和新密码的值不能相等
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码不能和旧密码一样'
            }
        },
        erPow: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入的密码不一样,请'
            }

        }
    })
    // 重置,密码
    $('.layui-form').on('submit', function (e) {
        // 阻止默认的事件
        e.preventDefault()
        //使用ajax修改密码
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('对不起密码修改失败')
                }
                //重置成功之后
                layui.layer.msg(res.message)
                // 清空表单的数据
                $('.layui-form')[0].reset()
            }
        })
    })
})