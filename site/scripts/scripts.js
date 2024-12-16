function onScroll() {
  const siteTitle = document.querySelector("#index-site-title");
  const infoSection = document.querySelector("#info");
  let scrollPosition = document.documentElement.scrollTop;
  let trigger = 0;
  trigger += infoSection.scrollHeight;

  if ((trigger <= 0) || (scrollPosition >= trigger)) {
    siteTitle.style.opacity = 1;
    showFiltersButton.classList.remove('shift');
    hideFiltersButton.classList.remove('shift');
  } else {
    siteTitle.style.opacity = 0;
    showFiltersButton.classList.add('shift');
    hideFiltersButton.classList.add('shift');
  }
}

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

function showFilterMenu(show) {
  if (show == true) {
    document.querySelector("#filter-menu").showModal();
  } else {
    document.querySelector("#filter-menu").close();
  }
}

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
  const title = document.querySelector('title');

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
    title.innerHTML = "Myles Larson : " + currentFilter;
  }
  document.querySelector("#reset-filters").style.visibility = "visible";
  showFilterMenu(false);
  onScroll();
}

function resetFilters() {
  removeURLFilter();

  const title = document.querySelector('title');
  const filters = document.querySelectorAll('.filter');
  const posts = document.querySelectorAll('.post');

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
  showMoreInfo(false);
  title.innerHTML = "Myles Larson";
  document.querySelector("#reset-filters").style.visibility = "hidden";
  showFilterMenu(false);
  onScroll();
}

function showMoreInfo(show) {
  const moreInfo = document.querySelector("#more-info");
  const moreInfoButton = document.querySelector("#show-more-info");
  const title = document.querySelector('title');

  if (show == true) {
    updateURLFilter("info");
    title.innerHTML = "Myles Larson : Info";
    moreInfo.classList.remove("hidden");
    moreInfoButton.classList.add("hidden");
  } else {
    removeURLFilter();
    title.innerHTML = "Myles Larson";
    moreInfo.classList.add("hidden");
    moreInfoButton.classList.remove("hidden");
  }

  onScroll();
}

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