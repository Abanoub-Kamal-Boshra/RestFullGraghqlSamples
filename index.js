const { ApolloServer, gql } = require('apollo-server');

let articles = [
    { id: 1, title: 'article1', body: "body of article 1" },
    { id: 2, title: 'article2', body: "body of article 2" },
    { id: 3, title: 'article3', body: "body of article 3" },
    { id: 4, title: 'article4', body: "body of article 4" },
    
];

const schema = `
    type Article {
        id: ID! 
        title: String!
        body: String!
    }

    type Query {
        allArticles (last: Int): [Article]
    }

    type Mutation {
        deleteArticle (id: ID): [Article]
        createArticle (id: ID, title: String, body: String) : [Article]
    }
`

const typeDefs = gql(schema);

const resolvers = {
    Query: {
        allArticles: (_, { last }) => {
            if (!last) return articles;
            if (last) return articles.slice(last);
        }
    },
    Mutation: {
        deleteArticle: (_, { id }) => {
            articles = articles.filter((article) => article.id !== id);
            return articles;
        },
        createArticle: (_, {id, title, body}) => {
            articles.push({
                id: id,
                title: title,
                body: body
            })

            return articles;
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(4001).then(({ url }) => { console.log('url: ', url) });

