import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: RES_PER_PAGE,
        page: 1
    }
};

export const loadRecipe = async function (id) {

    try {

        const data = await (getJSON(`${API_URL}${id}`));

        // let recipe = data.data.recipe;
        const { recipe } = data.data;

        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }
    } catch (err) {
        // console.error(err)
        throw err;
    }
}

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`)
        state.search.results = (data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
            }
        }));
        state.search.page = 1;
    } catch (err) {
        throw err
    }
}



export const getSearchResultByPage = function (page = state.search.page) {
    state.search.page = page;
    return state.search.results.slice(((page - 1) * state.search.resultsPerPage), (page * state.search.resultsPerPage))
}

export const updateServings = (newServings) => {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (newServings / state.recipe.servings) * ing.quantity;
    });
    state.recipe.servings = newServings;
}