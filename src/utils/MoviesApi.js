export const apiUrl = "https://api.nomoreparties.co";

let moviesCache = null;

export async function fetchMovies() {
	if (moviesCache !== null) {
		return moviesCache
	} 

	moviesCache = fetch(`${apiUrl}/beatfilm-movies`)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Response is not ok");
			};
			return response.json();
		})
		.catch((e) => {
			moviesCache = null
			throw e
		})
	return moviesCache
}
