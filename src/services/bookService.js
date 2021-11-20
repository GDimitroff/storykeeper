const baseUrl =
    'https://story-keeper-3343a-default-rtdb.europe-west1.firebasedatabase.app';

export async function getAllBooks() {
    const response = await fetch(`${baseUrl}/books.json`);

    return await response.json();
}

export async function getBookById(id) {
    const response = await fetch(`${baseUrl}/books/${id}.json`);

    return await response.json();
}

export async function addNewBook(book) {
    await fetch(`${baseUrl}/books.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    });
}

export async function deleteBook(id) {
    await fetch(`${baseUrl}/books/${id}.json`, {
        method: 'DELETE',
    });
}
