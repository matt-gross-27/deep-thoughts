// import the gql tagged template function
const { gql } = require('apollo-server-express');
const { AuthenticationError } = require('apollo-server-express');

// create our typeDefs 
const typeDefs = gql`
  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactions: [Reaction]
    reactionCount: Int
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    thoughts(username: String): [Thought] 
    thought(_id: ID!): Thought
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

//export the typeDefs
module.exports = typeDefs;
