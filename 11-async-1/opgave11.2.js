// opgave11.2.js
const userUrl = 'https://jsonplaceholder.typicode.com/users';
const postUrl = 'https://jsonplaceholder.typicode.com/posts?userId=';

async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

async function fillUserTable() {
    try {
        const users = await get(userUrl);
        console.log(users);
        const tableBody = document.getElementById("userTableBody");
        let tableDataHtml = "";
        for (const user of users) {
            tableDataHtml += `<tr><td>${user.id}</td><td>${user.name}</td><td>${user.username}</td><td>${user.email}</td><td>${user.address.city}</td></tr>`;
        }
        tableBody.innerHTML = tableDataHtml;

        const userRows = document.querySelectorAll("#userTableBody tr");
        for (const row of userRows) {
            row.addEventListener("click", showUserPosts);
        }
    } catch (error) {
        console.log(error);
    }
}

function generatePostCards(posts) {
    var postContainer = document.getElementById("post-container");

    for (const post of posts) {
        var postCard = document.createElement("div");
        postCard.classList.add("post-card");

        var postTitle = document.createElement("h2");
        postTitle.classList.add("post-title");
        postTitle.textContent = post.title;

        var postBody = document.createElement("p");
        postBody.classList.add("post-body");
        postBody.textContent = post.body;

        postCard.appendChild(postTitle);
        postCard.appendChild(postBody);
        postContainer.appendChild(postCard);
    }
}

function clearPostCards() {
    var postContainer = document.getElementById("post-container");
    postContainer.innerHTML = "";
}

async function getPosts(userId) {
    try {
        const posts = await get(postUrl + userId);
        console.log(posts);
        return posts;
    } catch (error) {
        console.log(error);
    }
}

async function showUserPosts() {
    var userId = this.children[0].textContent;
    const posts = await getPosts(userId);
    clearPostCards();
    generatePostCards(posts);
}

fillUserTable();