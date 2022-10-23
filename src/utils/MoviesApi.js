const apiUrl = "https://api.nomoreparties.co";

export function getThumbnailUrl(movie) {
	return `${apiUrl}/${movie.image.url}`;
}

export async function fetchMovies() {
	const response = await fetch(`${apiUrl}/beatfilm-movies`);
	if (!response.ok) {
		throw new Error("Response is not ok");
	}

	return response.json();
}
