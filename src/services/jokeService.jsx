export const addNewJoke = async (jokeObject) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jokeObject)
    }

    const response = await fetch("http://localhost:8088/jokes", postOptions)

}

export const getAllJokes = () => {
    return fetch("http://localhost:8088/jokes").then((res) => res.json())
}