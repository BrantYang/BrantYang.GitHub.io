既然你决定直接使用 HTML + CSS + JavaScript 来构建，这意味着你将拥有对页面布局和交互逻辑的完全控制权，这对于编写由于“在线计算工具”这类功能非常有利。

为了兼顾中英文切换和便捷更新，我们不应该把代码写死在单个巨大的 HTML 里。虽然 GitHub Pages 原生支持 Jekyll，但如果你希望保持纯 HTML 结构，为了避免“改一个导航栏要改 12 个文件”的痛苦，我们采用 “目录分层 + JS 动态加载公共组件” 的轻量级架构。

推荐使用 Bootstrap 5 框架，它能帮你快速搞定响应式（电脑/手机自适应）和美观的 UI，不用手写大量 CSS。

一、 目录与架构设计 (Engineering Structure)
我们将中文站和英文站分开存放，方便 SEO（搜索引擎优化）和管理。

my-vision-site/
├── index.html              # 入口页（用于检测浏览器语言自动跳转或提供入口）
├── css/                    # 自定义样式
│   └── style.css
├── js/                     # 核心逻辑脚本
│   ├── main.js             # 公共逻辑（加载导航栏、页脚）
│   └── tools.js            # 视觉计算器算法
├── assets/                 # 图片资源
│   ├── images/
│   │   ├── solutions/      # 案例图片
│   │   ├── hero-bg.jpg
│   │   └── qrcode.jpg      # 公众号二维码
├── zh/                     # 【中文版页面】
│   ├── index.html          # 首页
│   ├── tech.html           # 技术栈
│   ├── solutions.html      # 案例展示
│   ├── tools.html          # 在线工具
│   ├── share.html          # 干货分享
│   └── about.html          # 联系/关于
├── en/                     # 【English Pages】 - 结构同 zh/
│   ├── index.html
│   └── ... 
└── components/             # 公共 HTML 片段（利用 JS 加载，实现一次修改，全局生效）
    ├── navbar_zh.html      # 中文导航栏
    ├── navbar_en.html      # 英文导航栏
    ├── footer_zh.html
    └── footer_en.html

二、 核心代码实现
1. 入口页 (/index.html)
这个页面负责把用户分流到中文或英文版。

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Redirecting...</title>
    <script>
        var lang = navigator.language || navigator.userLanguage;
        if (lang.startsWith('zh')) {
            window.location.href = './zh/index.html';
        } else {
            window.location.href = './en/index.html'; // 默认英文或跳转特定页
        }
    </script>
</head>
<body>
</body>
</html>
2. 公共组件加载 (/js/main.js)
为了解决纯 HTML 维护难的问题，我们写一段 JS，在每个页面加载时，把导航栏和页脚“塞”进去。

document.addEventListener("DOMContentLoaded", function() {
    // 1. 确定当前语言路径 (根据 URL 判断是否在 /zh/ 目录下)
    const isZh = window.location.pathname.includes('/zh/');
    const lang = isZh ? 'zh' : 'en';

    // 2. 加载导航栏
    fetch(`../components/navbar_${lang}.html`) // 注意路径层级
        .then(response => response.text())
        .then(data => {
            document.getElementById('site-navbar').innerHTML = data;
        });

    // 3. 加载页脚
    fetch(`../components/footer_${lang}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('site-footer').innerHTML = data;
        });
});
3. 页面模板示例
下面是标准页面的“骨架”，你可以复制这个结构到 zh/ 下的所有文件。

引用库： FontAwesome (图标), Bootstrap 5 (UI).

<!-- zh/index.html 示例 -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>机器视觉工程师 - 首页</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>

    <!-- 导航栏占位符 -->
    <div id="site-navbar"></div>

    <!-- ===== 首页 Hero Banner ===== -->
    <!-- 视觉冲击力强的区域 -->
    <section class="hero-section text-white d-flex align-items-center" style="background: url('../assets/images/hero-bg.jpg') no-repeat center center; background-size: cover; height: 80vh;">
        <div class="container text-center" style="background: rgba(0,0,0,0.6); padding: 50px;">
            <h1 class="display-4 fw-bold">看见智能制造的未来</h1>
            <p class="lead">专注机器视觉算法落地 | OpenCV | Deep Learning | 工业自动化</p>
            <a href="solutions.html" class="btn btn-primary btn-lg mt-3">浏览行业案例</a>
            <a href="about.html" class="btn btn-outline-light btn-lg mt-3 ms-2">联系作者</a>
        </div>
    </section>

    <!-- ===== 最新动态/业务简介 ===== -->
    <div class="container my-5">
        <div class="row">
            <div class="col-md-4 text-center">
                <i class="fa-solid fa-microchip fa-3x text-primary mb-3"></i>
                <h3>硬核技术</h3>
                <p>分享从相机选型到算法部署的全栈经验。</p>
            </div>
            <div class="col-md-4 text-center">
                <i class="fa-solid fa-briefcase fa-3x text-primary mb-3"></i>
                <h3>实战案例</h3>
                <p>3C、汽车、新能源行业的真实落地项目解析。</p>
            </div>
            <div class="col-md-4 text-center">
                <i class="fa-solid fa-tools fa-3x text-primary mb-3"></i>
                <h3>在线工具箱</h3>
                <p>镜头焦距计算、精度评估等工程师必备工具。</p>
            </div>
        </div>
    </div>

    <!-- 页脚占位符 -->
    <div id="site-footer"></div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/main.js"></script>
</body>
</html>
三、 功能页面的具体设计逻辑
1. Solutions (solutions.html) - 案例筛选墙
这是展示实力的关键。使用 Bootstrap 的 Filtering 逻辑。

<!-- 按钮组 -->
<div class="container my-5">
    <div class="text-center mb-4">
        <button class="btn btn-outline-dark filter-btn active" data-filter="all">全部</button>
        <button class="btn btn-outline-dark filter-btn" data-filter="semicon">半导体</button>
        <button class="btn btn-outline-dark filter-btn" data-filter="3c">3C电子</button>
        <button class="btn btn-outline-dark filter-btn" data-filter="auto">汽车制造</button>
    </div>

    <!-- 图片墙 -->
    <div class="row g-4">
        <!-- 案例 Item 例子 -->
        <div class="col-md-4 case-item semicon">
            <div class="card h-100 shadow-sm">
                <img src="../assets/images/wafer.jpg" class="card-img-top" alt="Wafer">
                <div class="card-body">
                    <h5 class="card-title">晶圆表面缺陷检测</h5>
                    <p class="card-text">基于深度学习的微小划痕检测方案。</p>
                    <a href="#" class="btn btn-sm btn-primary">查看详情</a>
                </div>
            </div>
        </div>
        <!-- 更多案例...将 class 里的 semicon 换成 3c, auto 等 -->
    </div>
</div>

<script>
    // 简单的筛选脚本
    const buttons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.case-item');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 按钮样式切换
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            items.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
</script>
2. Tools (tools.html) - 机器视觉计算器
作为引流工具，这个页面非常重要，要实用。

<div class="container my-5">
    <h2><i class="fa-solid fa-calculator"></i> 视觉工程师工具箱</h2>
    
    <div class="row mt-4">
        <!-- 工具1：镜头焦距计算 -->
        <div class="col-md-6 mb-4">
            <div class="card border-primary">
                <div class="card-header bg-primary text-white">镜头焦距计算 (Lens Focal Length)</div>
                <div class="card-body">
                    <div class="mb-3">
                        <label>工作距离 (WD, mm)</label>
                        <input type="number" id="wd" class="form-control" placeholder="例如: 500">
                    </div>
                    <div class="mb-3">
                        <label>视场大小 (FOV, mm)</label>
                        <input type="number" id="fov" class="form-control" placeholder="例如: 100">
                    </div>
                    <div class="mb-3">
                        <label>传感器尺寸 (Sensor Size, mm)</label>
                        <select id="sensor" class="form-select">
                            <option value="6.4">1/2" (6.4mm)</option>
                            <option value="8.8">2/3" (8.8mm)</option>
                            <option value="12.8">1" (12.8mm)</option>
                        </select>
                    </div>
                    <button class="btn btn-success w-100" onclick="calculateFocal()">计算</button>
                    <div class="mt-3 alert