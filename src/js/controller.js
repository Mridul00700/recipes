import 'core-js/stable';
import 'regenerator-runtime/runtime';
import *  as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';
import { async } from 'regenerator-runtime';
import { MODAL_CLOSE_SEC } from './config';

// const recipeContainer = document.querySelector('.recipe');

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {

  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    // console.log(id);
    // 1) Loading recipe 
    // const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40');
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultByPage());
    bookmarksView.update(model.state.bookmarks);

    await model.loadRecipe(id);

    // 2) Rendering recipe 
    recipeView.render(model.state.recipe);

  } catch (err) {
    // recipeContainer.innerHTML = "";
    // console.log(err);
    recipeView.renderError();
    console.error(err);
  }
}

// Multiple events 
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

const controlSearchResult = async function () {
  try {
    resultsView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // Load search results

    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultByPage());
    // Pagination --
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
}

const controlPagination = (goToPage) => {

  // Render new results 
  resultsView.render(model.getSearchResultByPage(goToPage));
  // Render new pagination buttons
  paginationView.render(model.state.search);
}

const controlServings = function (newServings) {
  // Update the recipe servings  ( in state)
  model.updateServings(newServings);

  // Update the recipe view 
  // recipeView.render(model.state.recipe);
  // only update text and changed attributes not whole dom including images
  recipeView.update(model.state.recipe);

}

const controlAddBookmark = function () {


  if (!model.state.recipe.bookmarked)
    model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  // Render bookmark View
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async (newRecipe) => {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    // Change URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form -->

    setTimeout(function () {
      addRecipeView._toggleWindow();
    }, MODAL_CLOSE_SEC)

  } catch (error) {
    console.log(error);
    addRecipeView.renderError(error.message);
  }
}

const init = () => {
  bookmarksView.addhandlerBookmark(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  addRecipeView.addHandlerSubmit(controlAddRecipe);
}

init();