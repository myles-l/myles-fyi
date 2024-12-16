function onScroll() {
  const siteTitle = document.querySelector("#index-site-title");
  const infoSection = document.querySelector("#info");
  let scrollPosition = document.documentElement.scrollTop;
  let trigger = 0;
  trigger += infoSection.scrollHeight;

  if ((trigger <= 0) || (scrollPosition >= trigger)) {
    siteTitle.style.visibility = "visible";
    showFiltersButton.classList.remove('shift');
    hideFiltersButton.classList.remove('shift');
  } else {
    siteTitle.style.visibility = "hidden";
    showFiltersButton.classList.add('shift');
    hideFiltersButton.classList.add('shift');
  }
}

function copyToClipboard(address) {
  navigator.clipboard.writeText(address);
  
  const tooltip = document.querySelector("#mail-link .tooltip");
  const text = document.querySelector("#mail-link .text");
  tooltip.innerHTML = "copied to clipboard";
  text.innerHTML = "copied to clipboard";

  setTimeout(function(){
    tooltip.innerHTML = `copy ${address}`;
    text.innerHTML = address;
  }, 2000);
}

function showFilters() {
  document.querySelector("#filter-menu").showModal();
}

function hideFilters() {
  document.querySelector("#filter-menu").close();
}

function toggleFilter(tag) {
  if (tag == 'info') {
    if (document.querySelector('#more-info').classList.contains('hidden')) {
      showInfo();
    } else {
      resetFilters();
    }
  } else {
    let selectedFilter = document.querySelector('#filter-'+tag);
    let selectedFilterIsOn = selectedFilter.classList.contains('on');
    if (selectedFilterIsOn) {
      resetFilters();
    } else {
      applyFilter(tag);
    }
  }
}

function applyFilter(tag) {
  params = url.searchParams.get('filter');
  if (params != tag){
    url.searchParams.set('filter', tag);
    window.history.pushState(null, '', url.toString());
  }

  let filters = document.querySelectorAll('.filter');
  let posts = document.querySelectorAll('.post');

  for (let i in filters) {
    if (filters[i].classList) {
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
  }
  for (let i in posts) {
    if (posts[i].classList) {
      if (posts[i].classList.contains('tag-'+tag)) {
        posts[i].classList.remove('hidden');
      } else {
        posts[i].classList.add('hidden');
      }
    }
  }
  let currentFilter = document.querySelector('.filter.on a').innerHTML;
  if (currentFilter) {
    document.querySelector('title').innerHTML = "Myles Larson : "+currentFilter;
  }
  document.querySelector("#reset-filters").style.visibility = "visible";
  hideFilters();
  onScroll();
}

function resetFilters() {
  url.searchParams.delete('filter');
  window.history.pushState(null, '', url.toString());
  document.querySelector('title').innerHTML = "Myles Larson";

  let filters = document.querySelectorAll('.filter');
  let posts = document.querySelectorAll('.post');
  let moreInfo = document.querySelector("#more-info");
  let showMoreInfo = document.querySelector("#show-more-info");

  for (let i in filters) {
    if (filters[i].classList) {
      if (filters[i].classList.contains('off')) {
        filters[i].classList.remove('off');
      }
      if (filters[i].classList.contains('on')) {
        filters[i].classList.remove('on');
      }    
    }
  }
  for (let i in posts) {
    if (posts[i].classList) {
      if (posts[i].classList.contains('hidden')) {
        posts[i].classList.remove('hidden');
      }
    }
  }
  if (!(moreInfo.classList.contains('hidden'))) {
    moreInfo.classList.add('hidden');
  }
  if (showMoreInfo.classList.contains('hidden')) {
    showMoreInfo.classList.remove('hidden');
  }
  document.querySelector("#reset-filters").style.visibility = "hidden";
  hideFilters();
  onScroll();
}

function showInfo() {
  params = url.searchParams.get('filter');
  if (params != 'info'){
    url.searchParams.set('filter', 'info');
    window.history.pushState(null, '', url.toString());
  }
  document.querySelector('title').innerHTML = "Myles Larson : Info"
  document.querySelector("#more-info").classList.remove('hidden');
  document.querySelector("#show-more-info").classList.add('hidden');
  onScroll();
}