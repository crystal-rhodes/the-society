import ApolloBoost, { gql } from "apollo-boost";

const client = new ApolloBoost({
    uri: 'http://localhost:4000'
});

const getUsers = gql`
    query {
        users {
            id
            name
        }
    }
`

client.query({
    query: getUsers
}).then((response) => {
    let html = ''

    response.data.users.forEach((user, index) => {
        html += `
            <div>
                <h3>${index + 1}: ${user.name}</h3>
            </div>
        `
    });

    document.getElementById('users').innerHTML = html;
});

const getPublishedPosts = gql`
    query {
        posts {
            body
            title
            author {
                name
                email
            }
        }
    }
`

client.query({
    query: getPublishedPosts
}).then((response) => {
    let html = "";

    response.data.posts.forEach((post, index) => {
        html += `
            <div>
                <h3>${index + 1}: ${post.title}</h3>
                <h4>${post.body}</h4>
                <h4>Posted by: ${post.author.name} - ${post.author.email}</h4>
            </div>
        `

        document.getElementById('posts').innerHTML = html;
    })
})