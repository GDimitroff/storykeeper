export async function getAllBooks() {
    const response = await fetch(
        'https://story-keeper-3343a-default-rtdb.europe-west1.firebasedatabase.app/books.json'
    );

    return await response.json();
}
