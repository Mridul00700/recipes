import View from './View';

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');

    _window = document.querySelector('.add-recipe-window');

    _overlay = document.querySelector('.overlay');

    _btnOpen = document.querySelector('.nav__btn--add-recipe');

    _btnClose = document.querySelector('.btn--close-modal');


    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerCloseWindow();
    }

    _toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this._toggleWindow.bind(this));
    }
    _addHandlerCloseWindow() {
        this._btnClose.addEventListener('click', this._toggleWindow.bind(this));
        this._overlay.addEventListener('click', this._toggleWindow.bind(this));
    }

    addHandlerSubmit() {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            const data = [...new FormData(this)];
            console.log(data);
        });
    }

    _generateMarkup() {


    }

}

export default new AddRecipeView();