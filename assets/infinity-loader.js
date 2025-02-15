class InfinityLoader {
  constructor(url) {
    this.collectionUrl = url;
    this.init();
  }

  collectionUrl
  currentPage = 1;
  pagination
  productsGrid

  init() {
    this.pagination = document.querySelector('.pagination');
    this.productsGrid = document.querySelector('#product-grid');
    const currentProductsGridHeight = productsGrid.offsetHeight;
    if (pagination) {
      const totalPagesNumber = pagination.querySelectorAll('.pagination__item').length;
      window.addEventListener('scroll', () => {
        //compare current page with totalPagesNumber
        //compare current currentProductsGridHeight with current scroll position
        // if in both cases we receive true, then we launch this.onScrolling method
        // good to have some debounce function here for 10-30 px scroll
      })
    }
  }

  onScrolling = async () => {
    const url = this.generateUrl()
    const responseString = await this.fetchResult(value);
    this.dropdown.renderResult(this.parseSearchResult(responseString));
    fetch(url)
      .then(response => response.text())
      .then(data => {
        this.renderResult(this.parseResult(data));
        this.currentPage++
      })
      .catch(error => {
        console.error('Error:', error);
      })
  }

  parseResult = (str) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(str, "text/html");
      const searchResult = doc.querySelectorAll(".grid__item");
      return searchResult ? Array.from(searchResult) : [];
  };

  renderResult = (result) => {
    result.forEach((item) => {
      this.productsGrid.appendChild(item);
    });
  };

  generateUrl() {
    return `${collectionUrl}?page=${this.currentPage}`;
  }
}