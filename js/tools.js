(function () {
  function getLang() {
    const path = window.location.pathname || '';
    return path.includes('/zh/') ? 'zh' : 'en';
  }

  function t(zhText, enText) {
    return getLang() === 'zh' ? zhText : enText;
  }

  function getNumberValue(id) {
    const el = document.getElementById(id);
    if (!el) return NaN;
    const value = Number.parseFloat(el.value);
    return Number.isFinite(value) ? value : NaN;
  }

  // Expose for inline onclick="calculateFocal()"
  window.calculateFocal = function calculateFocal() {
    const wd = getNumberValue('wd');
    const fov = getNumberValue('fov');
    const sensor = getNumberValue('sensor');

    if (!Number.isFinite(wd) || !Number.isFinite(fov) || !Number.isFinite(sensor)) {
      window.alert(t('请输入完整参数', 'Please enter valid inputs'));
      return;
    }

    // A common thin-lens approximation used in quick engineering calculators.
    // Keeping the formula consistent with roadmap.md example.
    const f = (sensor * wd) / (fov + sensor);

    const out = document.getElementById('result-focal');
    if (out) out.textContent = f.toFixed(2);
  };

  // Expose for inline onclick="calculateResolution()"
  window.calculateResolution = function calculateResolution() {
    const fovWidth = getNumberValue('fovWidth');
    const imgWidth = getNumberValue('imgWidth');

    if (!Number.isFinite(fovWidth) || !Number.isFinite(imgWidth) || imgWidth <= 0) {
      window.alert(t('请输入完整参数', 'Please enter valid inputs'));
      return;
    }

    const mmPerPx = fovWidth / imgWidth;
    const out = document.getElementById('result-res');
    if (out) out.textContent = mmPerPx.toFixed(6);
  };
})();
