function showOnScroll() {
  let scrollHeight = 0;
  scrollHeight += document.querySelector("#info").scrollHeight;
  let title = document.querySelector("#index-site-title");

  if ((scrollHeight <= 0) || (document.documentElement.scrollTop >= scrollHeight)) {
    title.style.visibility = "visible";
    document.querySelector('#nav-filters').classList.remove('shift');
  } else {
    title.style.visibility = "hidden";
    document.querySelector('#nav-filters').classList.add('shift');
  }
}

function copyToClipboard(address) {
  navigator.clipboard.writeText(address);
  let tooltip = document.querySelector("#mail-link .tooltip");
  let text = document.querySelector("#mail-link .text");
  tooltip.innerHTML = "copied to clipboard";
  text.innerHTML = "copied to clipboard";
  setTimeout(function(){
    tooltip.innerHTML = `copy ${address}`;
    text.innerHTML = address;
  }, 2000);
}

function showFilters() {
  document.querySelector('#nav-filters').classList.remove('closed');
  document.querySelector('#nav-filters').classList.add('open');
}

function hideFilters() {
  document.querySelector('#nav-filters').classList.add('closed');
  document.querySelector('#nav-filters').classList.remove('open');
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
  hideFilters();
  showOnScroll();
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
  hideFilters();
  showOnScroll();
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
  showOnScroll();
}