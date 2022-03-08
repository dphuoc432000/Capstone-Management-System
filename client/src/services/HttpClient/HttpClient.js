import fetchAPI from "cross-fetch";

async function fetch(url) {
  try {
    let response = await fetchAPI(url);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default { fetch };
