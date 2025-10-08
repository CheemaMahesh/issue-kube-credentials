import {
  NAME_REQUIREMENT,
  REQUIREMENT,
  CREDENTIAL_REQUIREMENT,
  NAME_LENGTH,
  CREDENTIAL_LENGTH,
  VALIDATION_SUCCESS,
  CREDENTIAL_ID_MUST_BE_AN_INTEGER,
} from "../utils/messages";

export const issueValidation = (
  name: string,
  credentialId: string
): { success: boolean; messages: string[] } => {
  const messages: string[] = [];
  const trimmedName = name?.trim();
  const trimmedCredential = credentialId?.trim();

  // -------------Both missing
  if (!trimmedName && !trimmedCredential) {
    messages.push(REQUIREMENT);
  } else {
    // -------------Name validations
    if (!trimmedName) messages.push(NAME_REQUIREMENT);
    else if (trimmedName.length < 3) messages.push(NAME_LENGTH);

    // -------------Credential validations
    if (!trimmedCredential) {
      messages.push(CREDENTIAL_REQUIREMENT);
    } else {
      const credentialNumber = Number(trimmedCredential);

      // -------------Check integer first
      if (!Number.isInteger(credentialNumber)) {
        messages.push(CREDENTIAL_ID_MUST_BE_AN_INTEGER);
      } else if (trimmedCredential.length < 4) {
        // -------------Only check length if it's a valid integer
        messages.push(CREDENTIAL_LENGTH);
      }
    }
  }

  return {
    success: messages.length === 0,
    messages: messages.length ? messages : [VALIDATION_SUCCESS],
  };
};
