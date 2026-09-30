// Chinese: the <head> script marked <html class="zh">; swap in the data-zh text
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('zh')) return;
  root.lang = 'zh-Hans';
  document.querySelectorAll('[data-zh]').forEach(function (el) { el.innerHTML = el.dataset.zh; });
  document.querySelectorAll('[data-zh-done]').forEach(function (el) { el.dataset.done = el.dataset.zhDone; });
  document.querySelectorAll('[data-zh-lang]').forEach(function (el) { el.dataset.lang = el.dataset.zhLang; });
  root.classList.add('ready');
})();
(function () {
  var items = document.querySelectorAll('.agent'), n = 0;
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(function () {
      var cur = items[n]; n = (n + 1) % items.length;
      cur.classList.remove('on'); cur.classList.add('out');
      setTimeout(function () { cur.classList.remove('out'); }, 450);
      items[n].classList.add('on');
    }, 2200);
  }
  var tabs = document.querySelectorAll('.tab'), scenes = document.querySelectorAll('.scene');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.classList.toggle('on', x === t); });
      scenes.forEach(function (s, i) { s.classList.toggle('on', i === +t.dataset.s); });
    });
  });
  var io = 'IntersectionObserver' in window && new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .15 });
  document.querySelectorAll('.reveal').forEach(function (el) { io ? io.observe(el) : el.classList.add('in'); });
})();
document.querySelectorAll('button[data-copy]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var text = document.getElementById(btn.dataset.copy).textContent.trim();
    var label = btn.textContent;
    navigator.clipboard.writeText(text).then(function () {
      btn.textContent = btn.dataset.done;
      setTimeout(function () { btn.textContent = label; }, 1600);
    });
  });
});
// Language switch: remember the choice, then reload so the page renders in it
document.querySelectorAll('a[data-lang]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    try { localStorage.setItem('aide-lang', a.dataset.lang); } catch (err) {}
    location.reload();
  });
});
