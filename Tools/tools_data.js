/**
 * Tools/tools_data.js
 * 
 * 配置文件说明：
 * add new object to TOOLS_CONFIG array to add a new tool.
 * 
 * 字段说明：
 * - id: 唯一标识符
 * - filename: Tools文件夹下的文件名 (例如 "lens_calc.html")
 * - icon: FontAwesome 图标代码 (例如 "fa-solid fa-camera")
 * - category: 决定图标颜色 -> 'calc'(计算-青色), 'tool'(工具-洋红), 'hw'(硬件-蓝色), 'fun'(娱乐-橙色)
 * - title: { zh: "中标题", en: "Eng Title" }
 * - desc: { zh: "中描述", en: "Eng Desc" }
 * - tags: 显示在卡片底部的标签数组
 * - keywords: 用于搜索的关键词字符串
 */

const TOOLS_CONFIG = [
  {
    "id": "lens_calc",
    "filename": "lens_calc.html",
    "icon": "fa-solid fa-camera",
    "category": "calc",
    "title": {
      "zh": "镜头焦距计算器",
      "en": "Lens Focal Calculator"
    },
    "desc": {
      "zh": "根据工作距离 (WD)、视场 (FOV) 和传感器尺寸，快速估算所需镜头焦距。",
      "en": "Estimate required focal length based on Working Distance, FOV, and Sensor Size."
    },
    "tags": ["选型", "Optics", "Essential"],
    "keywords": "lens focal optics camera sensor 焦距 镜头 选型"
  },
  {
    "id": "res_calc",
    "filename": "resolution_calc.html",
    "icon": "fa-solid fa-ruler-combined",
    "category": "calc",
    "title": {
      "zh": "视觉精度/分辨率估算",
      "en": "Precision Estimator"
    },
    "desc": {
      "zh": "输入 FOV 与相机像素分辨率，计算单像素对应的物理尺寸 (mm/px)。",
      "en": "Calculate physical resolution (mm/px) based on FOV and camera pixels."
    },
    "tags": ["系统设计", "Accuracy", "Pixel"],
    "keywords": "resolution precision pixel accuracy mm/px 精度 分辨率"
  },
  {
    "id": "pattern_gen",
    "filename": "pattern_gen.html",
    "icon": "fa-solid fa-qrcode",
    "category": "tool",
    "title": {
      "zh": "标定板生成器",
      "en": "Calibration Pattern Gen"
    },
    "desc": {
      "zh": "在线生成 ChArUco 或棋盘格标定图案，支持自定义尺寸并导出高清 PDF 用于打印。",
      "en": "Generate ChArUco/Checkerboard patterns and export to PDF for printing."
    },
    "tags": ["Calibration", "PDF", "ArUco", "OpenCV"],
    "keywords": "calibration pattern aruco checkerboard 标定板 棋盘格"
  },
  {
    "id": "wheel",
    "filename": "Colorful Adventure Wheel.html", /* 请确保文件名与你实际保存的一致 */
    "icon": "fa-solid fa-dharmachakra",
    "category": "fun",
    "title": {
      "zh": "幸运大转盘",
      "en": "Adventure Wheel"
    },
    "desc": {
      "zh": "一个简单的随机选择转盘工具，可用于团队抽奖、午餐选择或随机决策。",
      "en": "A simple random selection wheel tool used for team draws or random decision making."
    },
    "tags": ["Utility", "Fun", "Random"],
    "keywords": "wheel random luck draw 随机 转盘"
  },
  {
    "id": "unit_conv",
    "filename": "#", /* 暂时没有链接 */
    "icon": "fa-solid fa-arrow-right-arrow-left",
    "category": "hw",
    "title": {
      "zh": "单位换算 (开发中)",
      "en": "Unit Converter (WIP)"
    },
    "desc": {
      "zh": "常用工业单位换算：英寸/毫米，流明/勒克斯，线对/分辨率。",
      "en": "Common industrial unit conversions (Inch/mm, Lux/Lumen, Line-pairs)."
    },
    "tags": ["Helper", "Coming Soon"],
    "keywords": "unit convert inch mm lux 换算"
  }
];