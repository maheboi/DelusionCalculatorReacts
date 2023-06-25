/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      ageMin
      ageMax
      race
      MinimumIncome
      probability
      education
      minimumHeight
      isObese
      isMarried
      __typename
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        ageMin
        ageMax
        race
        MinimumIncome
        probability
        education
        minimumHeight
        isObese
        isMarried
        __typename
      }
      nextToken
      __typename
    }
  }
`;
