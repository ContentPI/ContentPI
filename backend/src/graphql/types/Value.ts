import gql from 'graphql-tag'

export default gql`
  type Value {
    id: UUID!
    entry: UUID!
    value: String!
    fieldIdentifier: String!
    fieldId: UUID!
  }

  type Entries {
    entries: JSON!
  }

  type EntryIds {
    entryId: UUID!
  }

  type Query {
    getValuesByEntry(entry: UUID!): [Value!]
    getEntriesByModelId(modelId: UUID!): Entries!
  }

  type Mutation {
    createValues(input: [CreateOrUpdateValueInput]): [Value!]
    findUniqueValues(input: [ValueInput]): [Value!]
    updateValues(entry: UUID!, input: [CreateOrUpdateValueInput]): [Value!]
    deleteValues(entries: [EntriesInput]): [EntryIds!]
    publishOrUnpublishEntries(
      entries: [EntriesInput]
      action: String!
    ): [EntryIds!]
  }

  input EntriesInput {
    id: UUID!
    checked: Boolean!
    status: String!
  }

  input ValueInput {
    value: String!
  }

  input CreateOrUpdateValueInput {
    entry: UUID!
    value: String!
    fieldIdentifier: String!
    fieldId: UUID!
  }
`
