/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createResident = /* GraphQL */ `
  mutation CreateResident(
    $input: CreateResidentInput!
    $condition: ModelResidentConditionInput
  ) {
    createResident(input: $input, condition: $condition) {
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
export const updateResident = /* GraphQL */ `
  mutation UpdateResident(
    $input: UpdateResidentInput!
    $condition: ModelResidentConditionInput
  ) {
    updateResident(input: $input, condition: $condition) {
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
export const deleteResident = /* GraphQL */ `
  mutation DeleteResident(
    $input: DeleteResidentInput!
    $condition: ModelResidentConditionInput
  ) {
    deleteResident(input: $input, condition: $condition) {
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
