import {
  NAME_REQUIREMENT,
  REQUIREMENT,
  CREDENTIAL_REQUIREMENT,
  VALIDATION_SUCCESS,
} from "../utils/messages";

export const issueValidation = (name: string, credentialId: string) => {
  if (!name || !credentialId) {
    return { success: false, message: REQUIREMENT };
  }

  if (name.length < 3) {
    return { success: false, message: NAME_REQUIREMENT };
  }

  if (credentialId.length < 4) {
    return { success: false, message: CREDENTIAL_REQUIREMENT };
  }

  return { success: true, message: VALIDATION_SUCCESS };
};
