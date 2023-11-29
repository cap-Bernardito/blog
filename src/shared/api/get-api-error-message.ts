import { isFetchBaseQueryError } from "./is-fetch-base-query-error";

export const getApiErrorMessage = (error: unknown) => {
  let errorMessage = "Что-то пошло не так";

  if (error instanceof Error) {
    errorMessage = error.message;
  }

  if (isFetchBaseQueryError(error)) {
    // TODO: после перехода на RTK убрать поле "message"
    if (error.data && typeof error.data === "object" && "message" in error.data) {
      errorMessage = error.data.message as string;
    }
  }

  return errorMessage;
};
