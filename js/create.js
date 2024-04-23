const form = document.querySelector('form');
const imageInput = document.getElementById('imgInp');
const imgElement = document.getElementById('img');

let imageData = null; // Variable to store image data

// Event listener for when an image is selected
imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        imageData = e.target.result; // Store the Base64 data URL
        imgElement.src = imageData; // Display the image preview
    };

    reader.readAsDataURL(file);
});

const createPost = async (e) => {
    e.preventDefault();
    
    // Fetch existing posts to find the maximum ID
    const response = await fetch('http://localhost:3000/posts');
    const posts = await response.json();
    
    // Find the maximum ID among existing posts
    let maxId = 0;
    posts.forEach(post => {
        maxId = Math.max(maxId, parseInt(post.id));
    });
    
    // Increment the maximum ID by 1 for the new post
    let newId = maxId + 1;

    // Create the new post object
    const doc = {
        id: newId,
        image: imageData, // Use the image data (Base64) instead of form.image.value
        title: form.title.value,
        body: form.body.value,
        likes: 10
    };

    // Send a POST request to create the new post
    await fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: { 'Content-Type': 'application/json' }
    });

    window.location.replace('/index.html');
};

form.addEventListener('submit', createPost);
