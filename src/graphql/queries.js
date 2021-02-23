/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAttending = /* GraphQL */ `
  query GetAttending($id: ID!) {
    getAttending(id: $id) {
      id
      isAttending
      emailAddress
      displayName
      personDetails {
        name
        dietaryRestrictions
        status
      }
      createdAt
      updatedAt
    }
  }
`;
export const listAttendings = /* GraphQL */ `
  query ListAttendings(
    $filter: ModelAttendingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAttendings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        isAttending
        emailAddress
        displayName
        personDetails {
          name
          dietaryRestrictions
          status
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getContactDetails = /* GraphQL */ `
  query GetContactDetails($id: ID!) {
    getContactDetails(id: $id) {
      id
      email
      fullName
      createdAt
      updatedAt
    }
  }
`;
export const listContactDetailss = /* GraphQL */ `
  query ListContactDetailss(
    $filter: ModelContactDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContactDetailss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        fullName
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
