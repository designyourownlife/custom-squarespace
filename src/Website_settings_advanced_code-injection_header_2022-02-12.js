var ready = (callback) => {
  if (document.readyState != 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
};
/* section[data-section-id="…"] => sticky subnav on HOME & SERVICES */
ready(() => {
  /* Do things after DOM has fully loaded */
  var arrowUp = document.querySelector('#back-to-top');

  function showBackToTop(elem) {
    elem.classList.add('show-btn');
  }
  function hideBackToTop(elem) {
    elem.classList.remove('show-btn');
  }
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  function jumpToAnchor(anchorId, e=null) {
    if(e) e.preventDefault();
    var hash = anchorId;
    var target = document.querySelector(hash).closest("section");
    var stickyElem = document.querySelector('section[data-section-id="62062a411a453a69710d77e1"]') || document.querySelector('section[data-section-id="62062a4d1a453a69710d78ef"]') || false;
    var headerOffset = 0;
    if(stickyElem) {
      headerOffset = stickyElem.getBoundingClientRect().bottom;
    }
    var elementPosition = target.offsetTop;
    var offsetPosition = elementPosition - headerOffset;
    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
  };
  function initAnchorLinksOnPage() {
    document
    .querySelectorAll('a[href^="#"].sqs-block-button-element--medium.sqs-button-element--primary.sqs-block-button-element')
    .forEach(trigger => {
        trigger.onclick = function(e) {
          jumpToAnchor(this.getAttribute('href'), e);
        }
    });
  }
  function scrollToId(id) {
    setTimeout(() => {
      jumpToAnchor(id)
      checkScrollPos(arrowUp);
    },100)
  }
  //Check Scroll and Add Class
  function checkScrollPos(elem) {
    var top =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    if (top >= 640) {
      showBackToTop(elem);
    } else {
      hideBackToTop(elem);
    }
  }
  function stickyHandler(stickToElem, browserMinWidth) {
    // Create a media condition that targets viewports at least 768px wide
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    // Check if the media query is true
    if (mediaQuery.matches) {
      var elem = document.querySelector(stickToElem);
      var rect = elem.getBoundingClientRect();
      var bottomPos = Math.round(rect.bottom) + 'px';
      var stickyElem = document.querySelector('section[data-section-id="62062a411a453a69710d77e1"]') || document.querySelector('section[data-section-id="62062a4d1a453a69710d78ef"]');
      if (stickyElem.style.top !== bottomPos) {
        stickyElem.style.top = bottomPos;
      }
    }
  }
  // Scroll to the top when the button is clicked
  arrowUp.addEventListener('click', scrollToTop);
  // tell the browser to run the "checkScrollPos()" function just above when the user scrolls
  window.addEventListener('scroll', function () {
    checkScrollPos(arrowUp);
    stickyHandler('#header')
  });
  //Check the scroll position once when the page loads
  checkScrollPos(arrowUp);
  if (location.hash) {
    scrollToId(location.hash);
  }
  initAnchorLinksOnPage()
  //Dropdown workaround for main navigation
  var folders = document.querySelectorAll(
      'body:not(.header--menu-open) [data-header-style="solid"].header .header-nav-wrapper'
    ),
    folder_click = function () {
      var a = this.parentNode.querySelector('a');
      window.location = a.href;
    };
  Array.prototype.forEach.call(folders, function (folder) {
    folder.addEventListener('click', folder_click);
  });
});