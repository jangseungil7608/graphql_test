import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";

let tweets = [
  {
    id: "1",
    text: "first one",
    userId:"2"
  },
  {
    id: "2",
    text: "second one",
    userId:"1"
  },
]

let users = [
  {
    id:"1",
    firstName:"Seungil",
    lastName:"Jang",
  },
  {
    id:"2",
    firstName:"ElON",
    lastName:"Mask",
  }
]

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
  }
  type Tweet {
    id: ID
    text: String
    author: User
  }
  """
  Movie type
  """
  type Movie {
    id: Int!
    url: String
    imdb_code: String
    title: String
    title_english: String
    title_long: String
    slug: String
    year: Int
    rating: Float
    runtime: Float
    genres: [String]
    summary: String
    description_full: String
    synopsis: String
    yt_trailer_code: String
    language: String
    mpa_rating: String
    background_image: String
    background_image_original: String
    small_cover_image: String
    medium_cover_image: String
    large_cover_image: String
  }
    """
    Query TEST
    """
  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
    """
    ping TEST
    """
    ping: String!
    allMovies: [Movie!]!
    movie(id: String!): Movie
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean
  }
`;


const resolvers = {
  Query: {
    allUsers() {
      return users;
    },
    allTweets() {
      return tweets;
    },
    tweet(_, args) {
      console.log(args.id);
      //return tweets['id'][args.id];
      return tweets.find((tweet) => tweet.id === args.id);
    },
    ping() {
      return "pong";
    },
    async allMovies() {
      const r = await fetch("https://yts.mx/api/v2/list_movies.json");
      const json = await r.json();
      return json.data.movies;
    },
    async movie(_, {id}) {
      const r = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
      const json = await r.json();
      return json.data.movie;
    },
  },
  Mutation: {
    postTweet(_, {text, userId}) {
      const newTweet = {
        id: tweets.length +1,
        text: text,
        userId: userId
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(_, {id}) {
      const tweet = tweets.find((tweet) => tweet.id === id);
      if (!tweet) return false;
      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true;
    },
  },
  User: {
    fullName({firstName, lastName}) {
      return `${lastName} ${firstName}`;
    },
  },
  Tweet: {
    author({userId}) {
      return users.find((user) => user.id === userId);
    }
  }
};
const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

