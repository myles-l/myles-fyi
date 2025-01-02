// SCROLL

function onScroll() {
  const siteTitle = document.querySelector("#index-site-title");
  const infoSection = document.querySelector("#info");
  const filterMenuButton = document.querySelector("#filter-menu-button");
  const isMenuOpen = document.querySelector("#nav-filters").classList.contains("open");
  let scrollPosition = document.documentElement.scrollTop;
  let trigger = 0;
  trigger += infoSection.scrollHeight;

  if (scrollPosition >= trigger) {
    siteTitle.classList.remove("invisible");
    filterMenuButton.classList.remove("shift");
  } else if (isMenuOpen) {
    siteTitle.classList.remove("invisible");
    filterMenuButton.classList.add("shift");
  } else {
    siteTitle.classList.add("invisible");
    filterMenuButton.classList.add("shift");
  }
}


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
  const isFilterOn = document.querySelector("#current-filter").classList.contains("on");
  const isMenuOpen = document.querySelector("#nav-filters").classList.contains("open");

  if (isFilterOn) {
    resetFilters();
  } else if (isMenuOpen) {
    hideFilterMenu();
  } else {
    showFilterMenu();
  }
}

function showFilterMenu() {
  const menuButton = document.querySelector("#filter-menu-button");
  const filterMenu = document.querySelector("#nav-filters");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");

  menuButton.classList.add("x");
  filterMenu.classList.add("open");
  main.classList.add("blur");
  footer.classList.add("blur");
  onScroll();
}

function hideFilterMenu() {
  const menuButton = document.querySelector("#filter-menu-button");
  const filterMenu = document.querySelector("#nav-filters");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");
  const isFilterOn = document.querySelector("#current-filter").classList.contains("on");

  if (!isFilterOn) {
    menuButton.classList.remove("x");
  }
  filterMenu.classList.remove("open");
  main.classList.remove("blur");
  footer.classList.remove("blur");
  onScroll();
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
  const filterHeader = document.querySelector("#current-filter");
  const filterHeaderText = document.querySelector("#current-filter a");
  const posts = document.querySelectorAll('.post');
  const info = document.querySelector("#info");
  const menuButton = document.querySelector("#filter-menu-button");

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
  let currentFilter = document.querySelector('.filter.on a').innerHTML;
  if (currentFilter) {
    updateSiteTitle(currentFilter);
  }
  filterHeaderText.innerHTML = currentFilter;
  updateURLFilter(tag);
  filterHeader.classList.add("on");
  menuButton.classList.add("x");
  hideFilterMenu();
  onScroll();
}

function resetFilters() {
  const filterHeader = document.querySelector("#current-filter");
  const filters = document.querySelectorAll('.filter');
  const posts = document.querySelectorAll('.post');
  const info = document.querySelector("#info");
  const menuButton = document.querySelector("#filter-menu-button");

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
  removeURLFilter();
  updateSiteTitle();
  filterHeader.classList.remove("on");
  menuButton.classList.remove("x");
  onScroll();
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
  onScroll();
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