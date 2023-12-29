import fetcher from "../../axios";

import { getAuthToken } from "../../token";

export const getAllContents = async () => {
  const response = await fetcher.get("/api/v1/contents", {
    headers: {
      "x-api-key": getAuthToken(),
    },
  });
  /** @type {import("./contents").ResponseGetAllContents} */
  const contents = response.data;

  return contents;
};

/**
 * @param {string} content
 * @returns
 */
export const postContent = async (content) => {
  const response = await fetcher.post(
    "/api/v1/contents",
    { content },
    {
      headers: {
        "x-api-key": getAuthToken(),
      },
    }
  );
  /** @type {import("./contents").ResponseGetAllContents} */
  const contents = response.data;

  return contents;
};
/**
 * @param {import("./contents").Content} content
 * @returns
 */
export const editContent = async (content) => {
  try {
    const response = await fetcher.patch(
      `/api/v1/contents/${content.id}`,
      { content: content.content },
      {
        headers: {
          "x-api-key": getAuthToken(),
        },
      }
    );
    /** @type {import("./contents").ResponseGetAllContents} */
    const contents = response.data;

    return contents;
  } catch (err) {
    throw err.response?.data.error?.message;
  }
};

export const deleteContent = async (id) => {
  try {
    const response = await fetcher.delete(`/api/v1/contents/${id}`, {
      headers: {
        "x-api-key": getAuthToken(),
      },
    });
    /** @type {import("./contents").ResponseGetAllContents} */
    const contents = response.data;

    return contents;
  } catch (err) {
    throw err.response?.data.error?.message;
  }
};
