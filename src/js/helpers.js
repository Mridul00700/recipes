export const getJSON = async function (url) {

    try {

        const res = await fetch(url);

        // 
        // json method is availiable on all the response objects..
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message} (${res.status})`)
        }

        return data;
    } catch (err) {
        throw err;
    }

}
