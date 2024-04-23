// javascript for index.html

const container = document.querySelector('.blogs');
const searchForm = document.querySelector('.search');

const renderPosts = async (term = '') => {
    let posts = []; // Declare posts outside the try block

    try {
        let uri = 'http://localhost:3000/posts';
        const res = await fetch(uri);
        posts = await res.json();
        
        if (term) {
            term = term.toLowerCase(); 
            posts = posts.filter(post => post.title.toLowerCase().includes(term));
        }

        console.log('Filtered Posts:', posts); 
        
    } catch (error) {
        console.error('Error rendering posts:', error);
    }
    
    let template = '';
    posts.forEach(post => {
        template += `
            <div class="post">
                <img width="100px" height="100px" src=${post.image} alt="Blog-image"/>
                <h1>${post.title}</h1>
                <p><small>${post.likes} likes</small></p>
                <p>${post.body}</p>
                <a href="/details.html?id=${post.id}">Read more...</a>
            </div>
        `;
    });

    container.innerHTML = template;
};

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = searchForm.term.value.trim();
    console.log('Search term:', searchTerm); // Debugging statement
    renderPosts(searchTerm);
});

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event triggered'); // Debugging statement
    renderPosts();
});