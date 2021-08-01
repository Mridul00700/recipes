
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import *  as model from './model';
import recipeView from './views/recipeView';


const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};




const controlRecipe = async function () {

  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    console.log(id);
    // 1) Loading recipe 
    // const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40');
    recipeView.renderSpinner();

    await model.loadRecipe(id);

    // 2) Rendering recipe 
    recipeView.render(model.state.recipe);

  } catch (err) {
    // recipeContainer.innerHTML = "";
    console.log(err);
  }
}

// Multiple events 
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
const arr = ['hashchange', 'load']
arr.forEach((event) => window.addEventListener(event, controlRecipe));