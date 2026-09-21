/**
 * Extracts a human-readable error message from Axios / ASP.NET Core API error responses.
 * Handles ASP.NET ValidationProblemDetails format:
 * {
 *   type: "...",
 *   title: "One or more validation errors occurred.",
 *   status: 400,
 *   errors: {
 *     Password: ["The field Password must be a string or array type with a minimum length of '6'."],
 *     Email: ["The Email field is not a valid e-mail address."]
 *   }
 * }
 * Also handles plain string responses and standard { message: "..." } payloads.
 */
export function formatApiError(error, defaultMsg = 'An unexpected error occurred.') {
  if (!error) return defaultMsg;

  if (typeof error === 'string') return error;

  const data = error.response?.data;
  if (!data) {
    if (error.message) return error.message;
    return defaultMsg;
  }

  // If response data is directly a string
  if (typeof data === 'string') {
    return data;
  }

  // If ASP.NET Core validation errors dictionary exists
  if (data.errors && typeof data.errors === 'object') {
    const messages = [];
    for (const [field, fieldErrors] of Object.entries(data.errors)) {
      if (Array.isArray(fieldErrors)) {
        messages.push(...fieldErrors);
      } else if (typeof fieldErrors === 'string') {
        messages.push(fieldErrors);
      }
    }
    if (messages.length > 0) {
      return messages.join(' ');
    }
  }

  // If data.message or data.title
  if (data.message && typeof data.message === 'string') {
    return data.message;
  }

  if (data.title && typeof data.title === 'string') {
    return data.title;
  }

  return defaultMsg;
}
