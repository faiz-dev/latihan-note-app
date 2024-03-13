import axios from "axios";
import { HTTP } from "./url";

export const handleLogin = async (email, password) => {
  const apiLogin = await axios
    .post(HTTP + "auth/login", {
      email: email,
      password: password,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
  return apiLogin;
};

export const setTokens = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token") ?? null;
};

export const tampilkan = async () => {
  const token = getToken();
  const notes = await axios
    .get(HTTP + "notes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((eror) => {
      return eror.response;
    });
  return notes;
};

export const addNote = async (title, content) => {
  const token = getToken();
  const noteBaru = {
    title: title,
    content: content,
    writer: 1,
  };
  const add = await axios
    .post(HTTP + "notes", noteBaru, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((eror) => {
      return eror.response;
    });
  return add;
};

export const deleteNote = async (id) => {
  const token = getToken();
  const deletes = await axios
    .delete(HTTP + "notes/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((eror) => {
      return eror.response;
    });
  return deletes;
};

export const editNote = async (id, title, content, writer) => {
  const token = getToken();
  const edits = await axios
    .put(
      HTTP + "notes/" + id,
      { title, content, writer },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((eror) => {
      return eror.response
    });
  return edits;
};

export const Register = async (name,email,password) => {
    const regis = axios.post((HTTP + "auth/register"),{
        name:name,
        email:email,
        password:password
    })
    .then((response) => {
        return response
    })
    .catch((error) => {
        return error.response
    })
    return regis
}
