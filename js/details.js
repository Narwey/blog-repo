const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('.details');
const deleteBtn = document.querySelector('.delete');
const editBtn = document.querySelector('.edit');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const editTitleInput = document.getElementById('title');
const editContentInput = document.getElementById('content');
const editLikesInput = document.getElementById('likes');

const renderDetails = async () => {
    const res = await fetch(`http://localhost:3000/posts/${id}`);
    const post = await res.json();
    const template = `
        <img width="100" src=${post.image} alt="Blog-image"/>
        <h1>${post.title}</h1>
        <p>${post.body}</p>
        `;
    container.innerHTML = template;
};

editBtn.addEventListener('click', async () => {
    const res = await fetch(`http://localhost:3000/posts/${id}`);
    const post = await res.json();
    editTitleInput.value = post.title;
    editContentInput.value = post.body;
    editLikesInput.value = post.likes;
    editModal.style.display = 'block';
});

deleteBtn.addEventListener('click', async () => {
    try {
        await fetch(`http://localhost:3000/posts/${id}`, {
            method: 'DELETE'
        });
        window.location.replace('/index.html');
    } catch (error) {
        console.error('Error deleting post:', error);
    }
});

editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = editTitleInput.value;
    const content = editContentInput.value;
    const likes = editLikesInput.value;
    const updatedPost = {
        title: title,
        body: content,
        likes: likes
    };
    try {
        const response = await fetch(`http://localhost:3000/posts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPost)
        });
        if (!response.ok) {
            throw new Error('Failed to update post');
        }
        window.location.replace('/index.html');
    } catch (error) {
        console.error('Error updating post:', error);
    }
});

window.addEventListener('DOMContentLoaded', () => renderDetails());