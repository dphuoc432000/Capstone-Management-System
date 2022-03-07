import fetch from "cross-fetch";

async function getData(url) {
  try {
    var response = await fetch(url);

    if (!response.ok) return null;

    var data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function postData(url, formData) {
  try {
    var option = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    var response = await fetch(url, option);

    if (!response.ok) return null;

    var data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function putData(url, formData) {
  try {
    var option = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    var response = await fetch(url, option);

    if (!response.ok) return null;

    var data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function deleteData(url, formData) {
  try {
    var option = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    var response = await fetch(url, option);

    if (!response.ok) return null;

    var data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default { getData, postData, putData, deleteData };
