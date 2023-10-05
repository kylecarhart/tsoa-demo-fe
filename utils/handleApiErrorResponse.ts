import {
  ErrorResponse,
  ResponseError,
  instanceOfErrorResponse,
} from "../@generated/src";

/**
 * Get the error response from the API response.
 * @param error Error thrown in try catch block.
 * @returns The parsed error response or undefined.
 */
export async function handleApiErrorResponse(
  error: any
): Promise<ErrorResponse> {
  if (error instanceof ResponseError) {
    const errorResponse = await error.response.json();

    console.warn({
      statusCode: error.response.status,
      responseJson: errorResponse,
    });

    if (instanceOfErrorResponse(errorResponse)) {
      return errorResponse;
    }
  }

  console.error("An unhandled error as occurred.", error);

  return {
    code: "UNHANDLED_ERROR",
    message: "An unknown error as occurred.",
  };
}
