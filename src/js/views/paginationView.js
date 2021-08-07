import View from './View';
import icons from 'url:../../img/icons.svg';



class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');


    _generateMarkup() {
        const currentPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        console.log(numPages);
        //Page 1  and there are other pages 
        if (currentPage === 1 && numPages > 1) {
            console.log("page1 and other");
        }


        // We are on last page 
        if (currentPage === numPages && numPages > 1) {
            return `
            <button class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="src/img/icons.svg#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
            </button>
            `;
        }

        // On random middle page
        if (tcurrentPage < numPages) {
            console.log("Random page");
        }

        // Page 1 and there are no other pages
        console.log("First page");
    }

}

export default new PaginationView;