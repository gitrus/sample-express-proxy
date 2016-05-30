export default async function handleErrors(response, message) {
  if (response.status >= 400) {
    const errors = (await response.json()).errors;

    if (response.status === 422 && errors) {
      throw new Error(JSON.stringify(errors));
    } else {
      throw new Error(message);
    }
  }
}
