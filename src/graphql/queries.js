/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getResident = /* GraphQL */ `
  query GetResident($id: ID!) {
    getResident(id: $id) {
      id
      firstName
      middleName
      lastName
      gender
      age
      address
      role
      profileImage
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listResidents = /* GraphQL */ `
  query ListResidents(
    $filter: ModelResidentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResidents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        middleName
        lastName
        gender
        age
        address
        role
        profileImage
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
