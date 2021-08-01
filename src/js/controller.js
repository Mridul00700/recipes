// const { async } = require("q");
// import icons from '../img/icons.svg'; // Works in parcel 1 
import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import *  as model from './model';
import recipeView from './views/recipeView';

console.log(icons);

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const renderSpinner = function (parentEl) {
  const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use> 
          </svg>
        </div>
  `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML('afterbegin', markup);
}


const controlRecipe = async function () {

  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // 1) Loading recipe 
    // const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40');
    renderSpinner(recipeContainer);

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
['hashchange', 'load'].forEach((event) => window.addEventListener(event, controlRecipe));