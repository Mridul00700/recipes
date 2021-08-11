import View from './View';
import PreviewView from './previewView';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView';

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
    _message = '';


    _generateMarkup() {
        return this._data.map(bookmarks => PreviewView.render(bookmarks, false)).join('');
    }
}


export default new BookmarksView;