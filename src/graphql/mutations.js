/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAttending = /* GraphQL */ `
  mutation CreateAttending(
    $input: CreateAttendingInput!
    $condition: ModelAttendingConditionInput
  ) {
    createAttending(input: $input, condition: $condition) {
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
export const updateAttending = /* GraphQL */ `
  mutation UpdateAttending(
    $input: UpdateAttendingInput!
    $condition: ModelAttendingConditionInput
  ) {
    updateAttending(input: $input, condition: $condition) {
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
export const deleteAttending = /* GraphQL */ `
  mutation DeleteAttending(
    $input: DeleteAttendingInput!
    $condition: ModelAttendingConditionInput
  ) {
    deleteAttending(input: $input, condition: $condition) {
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
export const createContactDetails = /* GraphQL */ `
  mutation CreateContactDetails(
    $input: CreateContactDetailsInput!
    $condition: ModelContactDetailsConditionInput
  ) {
    createContactDetails(input: $input, condition: $condition) {
      id
      email
      fullName
      createdAt
      updatedAt
    }
  }
`;
export const updateContactDetails = /* GraphQL */ `
  mutation UpdateContactDetails(
    $input: UpdateContactDetailsInput!
    $condition: ModelContactDetailsConditionInput
  ) {
    updateContactDetails(input: $input, condition: $condition) {
      id
      email
      fullName
      createdAt
      updatedAt
    }
  }
`;
export const deleteContactDetails = /* GraphQL */ `
  mutation DeleteContactDetails(
    $input: DeleteContactDetailsInput!
    $condition: ModelContactDetailsConditionInput
  ) {
    deleteContactDetails(input: $input, condition: $condition) {
      id
      email
      fullName
      createdAt
      updatedAt
    }
  }
`;
