const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Note {
    content: String!
    id: Int!
  }

  type Query {
    notes: [Note]
  }

  type Mutation {
    addNote(content: String!): Note
  }
`

module.exports = typeDefs
