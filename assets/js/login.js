$(function () {
    //绑定切换注册登录模板
    $("#link-reg").on('click', function () {
        $(".reg-box").show() //显示注册模板
        $(".login-box").hide() //隐藏注册模板
    })

    $("#link-login").on('click', function () {
        $(".reg-box").hide() //显示注册模板
        $(".login-box").show() //隐藏注册模板
    })

    // 表单验证
    var form = layui.form
    console.log(form);
    form.verify({
        paw: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        passd: function (value) {
            var paw = $(".reg-box input[name=password]").val();
            if (value !== paw) {
                return "对不起,两次输入的密码不一样,请您再次输入"
            }
        }
    })

    // 提交数据库
    $('#form_box').on('submit', function (e) {
        // 阻止默认事件
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val(),
            },
            success: function (res) {
                if (res.status !== 0) { return alert(res.message) }
                // 注册成功
                alert(res.message)
            }
        })
    })
})