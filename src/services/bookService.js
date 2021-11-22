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
    const response = await fetch(`${baseUrl}/books.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    });

    return await response.json();
}

export async function deleteBook(id) {
    await fetch(`${baseUrl}/books/${id}.json`, {
        method: 'DELETE',
    });
}

export async function updateBook(id, book) {
    const response = await fetch(`${baseUrl}/books/${id}.json`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    });

    return await response.json();
}
