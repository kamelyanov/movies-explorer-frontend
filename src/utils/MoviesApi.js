export const apiUrl = "https://api.nomoreparties.co";

export async function fetchMovies() {
	const response = await fetch(`${apiUrl}/beatfilm-movies`);
	if (!response.ok) {
		throw new Error("Response is not ok");
	}

	return response.json();
}
