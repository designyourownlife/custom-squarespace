function convertH1toH2() {
  var el = document.getElementsByTagName('h1')[0];
  var dummy = document.createElement('h2');
  dummy.innerHTML = el.innerHTML;
  el.parentNode.replaceChild(dummy, el);
}

document.addEventListener("DOMContentLoaded", () => {
  convertH1toH2()
});
