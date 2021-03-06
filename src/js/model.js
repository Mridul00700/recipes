import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config';
import { AJAX } from './helpers';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: RES_PER_PAGE,
        page: 1
    },
    bookmarks: []
};

const createRecipeObject = data => {
    const { recipe } = data.data;

    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && { key: recipe.key })
    }
}

export const loadRecipe = async function (id) {

    try {

        const data = await (AJAX(`${API_URL}${id}?key=${KEY}`));

        // let recipe = data.data.recipe;
        state.recipe = createRecipeObject(data);

        if (state.bookmarks.some(bookmark => bookmark.id === id))
            state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;

    } catch (err) {
        // console.error(err)
        throw err;
    }
}

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`)
        state.search.results = (data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
                ...(recipe.key && { key: recipe.key })
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

const persistBookmark = () => {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = (recipe) => {
    // Add bookmark 
    state.bookmarks.push(recipe);

    // mark current recipe as bookmarked -->
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    persistBookmark();
};

export const removeBookmark = (id) => {
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1);
    if (id === state.recipe.id) state.recipe.bookmarked = false;
    persistBookmark();
}

const init = () => {
    const bookmark = localStorage.getItem('bookmarks');
    if (bookmark)
        state.bookmarks = JSON.parse(bookmark);
}
init();

export const uploadRecipe = async (newRecipe) => {
    try {

        const ingredients = Object.entries(newRecipe).filter(entry => entry[0].includes("ingredient") && entry[1] !== "").map(ing => {
            const arr = ing[1].split(',').map(el => el.trim());
            if (arr.length !== 3) {
                throw new Error("Wrong ingredient format, please check the format");
            }
            const [quantity, unit, description] = arr;
            return { quantity: quantity ? +quantity : null, unit, description };
        });
        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
        }

        const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
        state.recipe = createRecipeObject(data);
        addBookmark(state.recipe);
    } catch (err) {
        throw err;
    }
}
