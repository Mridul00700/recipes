import View from './View';
import icons from 'url:../../img/icons.svg';
import PreviewView from './previewView';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'We could not find a recipe for your query. Please try another one ;)';
  _message = '';


  _generateMarkup() {
    return this._data.map(result => PreviewView.render(result, false)).join('');
  }

}


export default new ResultView;