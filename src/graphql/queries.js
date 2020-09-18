/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAttending = /* GraphQL */ `
  query GetAttending($id: ID!) {
    getAttending(id: $id) {
      id
      isAttending
      submitObject {
        emailAddress
        personDetails {
          name
          dietaryRestrictions
          status
        }
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
        submitObject {
          emailAddress
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
