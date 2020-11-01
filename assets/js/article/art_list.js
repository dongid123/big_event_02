
//入口函数
$(function () {
    // 4.事件过滤器
    template.defaults.imports.dateFormat = function (dtstr) {
        var dt = new Date(dtstr)
        var y = dt.getFullYear()
        var m = gitData(dt.getMonth() + 1)
        var d = gitData(dt.getDate())

        var hh = gitData(dt.getHours())
        var mm = gitData(dt.getMinutes())
        var ss = gitData(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    // 如果小于9就加0
    function gitData(n) {
        return n > 9 ? n : '0' + n
    }

    var laypage = layui.laypage;
    var layer = layui.layer
    var form = layui.form
    // 1.定义提交参数
    var q = {
        pagenum: 1,  // 页码值
        pagesize: 2,  // 每页显示多少条数据
        cate_id: '',  //	文章分类的 Id
        state: '',  //	文章的状态，可选值有：已发布、草稿
    }

    // 2把数据渲染到页面上的表格里面
    intnTable()
    function intnTable() {
        $.ajax({
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 当代码执行成功就渲染页面
                var Str = template('tpl-table', res)
                // 渲染到页面上
                $("tbody").html(Str)
                randerPage(res.total)
            }
        })
    }


    //3.获取文章列表数据
    initCate()
    //3.1封装一个可以获取ajax请求
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 成功之后dayin
                // layer.msg(res.message) 
                var htmlStr = template('tpl-cate', res)
                // console.log(htmlStr);
                //渲染到页面上
                $("[name=cate_id]").html(htmlStr)
                form.render()
            },
        })
    }

    // 5筛选功能
    $("#form-seach").on('submit', function (e) {
        e.preventDefault()
        // 获取重新的获取他的值
        q.state = $("[name=state]").val();
        q.cate_id = $("[name=cate_id]").val();
        // 根据最新的筛选条件重新渲染表单的数据
        intnTable()
    })

    // 6分页randerPage
    function randerPage(tobal) {
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: tobal, //数据总数，从服务端得到
            limit: q.pagesize,//每页几条
            curr: q.pagenum,//第几页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 5, 10, 15],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                //首次不执行
                if (!first) {
                    //do something
                    // 初始化文章列表
                    intnTable()
                }
            }
        });
    }

    //7.删除功能
    $('tbody').on('click', '.btn-delete', function () {
        // 获取id
        var id = $(this).attr("data-id")
        layer.confirm('请问您是否要删除本文章?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('文章删除失败')
                    }
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--
                    //删除成功就重新渲然页面
                    intnTable()
                }

            })
            layer.close(index);
        });
    })

})