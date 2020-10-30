$(function () {

    var layer = layui.layer
    infoArtCate()
    // 获取数据并渲染到页面上
    function infoArtCate() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('对不起获取数据失败')
                }
                // layer.msg(res.message)
                // 渲染到页面上
                var obj = template('tpl-art-cate', res)
                $("tbody").html(obj)
            }
        })
    }

    //  显示添加类别的弹出层
    var indexAdd = null
    $("#artCateAdd").on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '文章类别',
            area: ['500px', '260px'],
            content: $('#btnAdd').html()
        });
    });

    // 添加数据到数据
    $('body').on('submit', "#form-add", function (e) {
        e.preventDefault()
        // console.log(123);
        // 用ajax获取数据
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 代码执行成功之后刷新页面
                infoArtCate()
                // 执行成功之后提示
                layer.msg(res.message)
                // 自动关闭弹出层
                layer.close(indexAdd)
            }
        })
    })


    // 点击修改文章
    var indexEdit = null
    var form = layui.form
    $('body').on('click', '#edit', function () {
        // 弹出样式框
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '260px'],
            content: $('#btnedit').html()
        });
        var Id = $(this).attr('data-id')
        $.ajax({
            url: '/my/article/cates/' + Id,
            success: function (res) {
                // console.log(res);
                form.val('form-edit', res.data)
            }
        })
    });

    // 提交修改
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('对不起渲染失败')
                }
                // 1.
                infoArtCate()
                // 2.
                layer.msg('恭喜修改文章类别成功')
                // 3.
                layer.close(indexEdit)
            }
        })

    })

    // 点击删除
    $("tbody").on('click', "#delete", function () {
        var Id = $(this).attr('data-id')

        layer.confirm('请问是否要删除本文章?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/deletecate/' + Id,
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)

                    }
                    infoArtCate()
                    // 2.
                    layer.msg('恭喜修改文章类别成功')
                    // 3.
                    layer.close(indexEdit)
                }

            })

        });
    })
})