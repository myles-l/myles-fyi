// CLIPBOARD

function copyToClipboard(address) {
  const tooltip = document.querySelector("#mail-link .tooltip");
  const text = document.querySelector("#mail-link .text");

  navigator.clipboard.writeText(address);  
  tooltip.innerHTML = "copied to clipboard";
  text.innerHTML = "copied to clipboard";

  setTimeout(function(){
    tooltip.innerHTML = `copy ${address}`;
    text.innerHTML = address;
  }, 2000);
}


// FILTER MENU

function filterMenuButton() {
  const isMenuOpen = document.querySelector("#filter-popover").classList.contains("open");
  if (isMenuOpen) {
    hideFilterMenu();
  } else {
    showFilterMenu();
  }
}

function showFilterMenu() {
  const menuButton = document.querySelector("#filter-menu-button");
  const filterMenu = document.querySelector("#filter-popover");

  menuButton.classList.add("close");
  filterMenu.classList.add("open");
}

function hideFilterMenu() {
  const menuButton = document.querySelector("#filter-menu-button");
  const filterMenu = document.querySelector("#filter-popover");

  menuButton.classList.remove("close");
  filterMenu.classList.remove("open");
}


// FILTERS

function toggleFilter(tag) {
  if (tag == 'info') {
    const moreInfo = document.querySelector('#more-info');
    if (moreInfo.classList.contains("hidden")) {
      showMoreInfo(true);
    } else {
      resetFilters();
    }
  } else {
    const selectedFilter = document.querySelector('#filter-'+tag);
    if (selectedFilter.classList.contains('on')) {
      resetFilters();
    } else {
      applyFilter(tag);
    }
  }
}

function applyFilter(tag) {
  const filters = document.querySelectorAll('.filter');
  const posts = document.querySelectorAll('.post');
  const info = document.querySelector("#info");
  const menuButton = document.querySelector("#filter-menu-button");
  const siteTitle = document.querySelector("#index-site-title");

  for (let i = 0; i < filters.length; i++) {
    if (filters[i].id == ('filter-'+tag)) {
      if (filters[i].classList.contains('off')) {
        filters[i].classList.remove('off');
      }
      filters[i].classList.add('on');
    } else {
      if (filters[i].classList.contains('on')) {
        filters[i].classList.remove('on');
      }
      filters[i].classList.add('off');
    }
  }
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].classList.contains('tag-'+tag)) {
      posts[i].classList.remove('hidden');
    } else {
      posts[i].classList.add('hidden');
    }
  }
  info.classList.add("hidden");
  siteTitle.classList.remove("invisible");
  menuButton.classList.remove("center");
  updateSiteTitle(deslug(tag));
  updateURLFilter(tag);
  hideFilterMenu();
}

function resetFilters() {
  const filters = document.querySelectorAll('.filter');
  const posts = document.querySelectorAll('.post');
  const info = document.querySelector("#info");
  const menuButton = document.querySelector("#filter-menu-button");
  const siteTitle = document.querySelector("#index-site-title");
  const allFilter = document.querySelector("#filter-all");

  for (let i = 0; i < filters.length; i++) {
    if (filters[i].classList.contains('off')) {
      filters[i].classList.remove('off');
    }
    if (filters[i].classList.contains('on')) {
      filters[i].classList.remove('on');
    }    
  }
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].classList.contains('hidden')) {
      posts[i].classList.remove('hidden');
    }
  }
  showMoreInfo(false);
  info.classList.remove("hidden");
  siteTitle.classList.add("invisible");
  menuButton.classList.add("center");
  allFilter.classList.add("on");
  removeURLFilter();
  updateSiteTitle();
  hideFilterMenu();
}


// INFO

function showMoreInfo(show) {
  const moreInfo = document.querySelector("#more-info");
  const moreInfoButton = document.querySelector("#show-more-info");

  if (show == true) {
    updateURLFilter("info");
    updateSiteTitle("Info");
    moreInfo.classList.remove("hidden");
    moreInfoButton.classList.add("hidden");
  } else {
    removeURLFilter();
    updateSiteTitle();
    moreInfo.classList.add("hidden");
    moreInfoButton.classList.remove("hidden");
  }
}


// URL

function getURLFilter() {
  const url = new URL(window.location.href);
  const params = url.searchParams.get('filter');
  return params;
}

function updateURLFilter(filter) {
  const url = new URL(window.location.href);
  const params = url.searchParams.get('filter');
  if (params != filter){
    url.searchParams.set('filter', filter);
    window.history.pushState(null, '', url.toString());
  }
}

function removeURLFilter() {
  const url = new URL(window.location.href);
  url.searchParams.delete('filter');
  window.history.pushState(null, '', url.toString());
}

function updateSiteTitle(filter) {
  const title = document.querySelector('title');
  if (filter == undefined) {
    title.innerHTML = "Myles Larson";
  } else {
    title.innerHTML = "Myles Larson : " + filter;
  }
}


// HELPERS

function getOffset( el ) {
  var _x = 0;
  var _y = 0;
  while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

function getCurrentFilter(){
  const filters = document.querySelectorAll('.filter');
  let currentFilter = "none";

  for (let i = 0; i < filters.length; i++) {
    if (filters[i].classList.contains('on')) {
      currentFilter = filters[i].id.replace("filter-", "");
    }
  }
  return currentFilter;
}

function deslug(tag) {
  if (typeof tag === "string") {
    tag = tag.replaceAll("-", " ");
    let first = tag.at(0).toUpperCase();
    return first + tag.slice(1);
  } else {
    return "not a string";
  }
}


// SERIES

function series(post) {
  const container = document.querySelector(post + " .series");
  const length = document.querySelectorAll(post + " .slide").length;
  const index = document.querySelector(post + " .series-index");
  let i = 1;
  let z = 1;

  container.addEventListener("click", next);

  function next() {
    const prev = document.querySelector(post + " .slide-" + i);
    i++;
    if (i > length) {
      i = 1;
    }
    z++;
    const next = document.querySelector(post + " .slide-" + i);

    next.classList.remove("invisible");
    prev.classList.add("invisible");
    next.style.zIndex = z;
    index.innerHTML = i;
  }
}