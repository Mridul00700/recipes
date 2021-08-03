import 'core-js/stable';
import 'regenerator-runtime/runtime';
import *  as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';

const recipeContainer = document.querySelector('.recipe');


const controlRecipe = async function () {

  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    // console.log(id);
    // 1) Loading recipe 
    // const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40');
    recipeView.renderSpinner();

    await model.loadRecipe(id);

    // 2) Rendering recipe 
    recipeView.render(model.state.recipe);

  } catch (err) {
    // recipeContainer.innerHTML = "";
    // console.log(err);
    recipeView.renderError()
  }
}

// Multiple events 
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

const controlSearchResult = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
}


const init = () => {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResult);
}

init();