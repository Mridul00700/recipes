import View from './View';
import icons from 'url:../../img/icons.svg';



class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            // We need to figure out which button was clicked. 
            const btn = e.target.closest('.btn--inline');
            console.log(btn);
            handler();
        });
    }




    _generateMarkup() {
        const currentPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        console.log(numPages);
        //Page 1  and there are other pages 
        if (currentPage === 1 && numPages > 1) {
            return `
            <button class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>x
            </svg>
            `
        }


        // We are on last page 
        if (currentPage === numPages && numPages > 1) {
            return `
            <button class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
            </button>
            `;
        }

        // On random middle page
        if (currentPage < numPages) {
            return `
            <button class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
            </button>
            <button class="btn--inline pagination__btn--next" >
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            `;
        }

        // Page 1 and there are no other pages hence no buttons
        return ``;
    }

}

export default new PaginationView;