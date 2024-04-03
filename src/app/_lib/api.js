import useSWR from "swr";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const fetcher = async (url) => {
  try {
    const response = await fetch(BASE_URL + url, {
      credentials: "include",
    });
    const jsonData = await response.json();
    if (!response.ok) {
      throw new Error(jsonData.message);
    }
    return jsonData;
  } catch (error) {
    throw new Error(error.message);
  }
};

export function useCollections() {
  const { data, isLoading, mutate, error } = useSWR(
    api.getAllProductCollections,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    collections: data,
    isCollectionsLoading: isLoading,
    mutateCollections: mutate,
    isCollectionsError: error,
  };
}

export function useTemplates() {
  const { data, isLoading, mutate, error } = useSWR(
    api.getAllProductTemplates,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    templates: data,
    isTemplatesLoading: isLoading,
    mutateTemplates: mutate,
    isTemplatesError: error,
  };
}

export function useProductItems() {
  const { data, isLoading, mutate, error } = useSWR(
    api.getAllProductItems,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    productItems: data,
    isProductItemsLoading: isLoading,
    mutateProductItems: mutate,
    isProductItemsError: error,
  };
}

const POST = async (url, data) => {
  try {
    const response = await fetch(BASE_URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const jsonData = await response.json();
    if (!response.ok) {
      throw new Error(jsonData.message);
    }
    return jsonData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const PUT = async (url, data) => {
  try {
    const response = await fetch(BASE_URL + url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const api = {
  // user
  userLogin: "/user/login",
  userRegister: "/user/register",
  getUserInfo: "/user/info",
  userLogout: "/user/logout",

  // collections
  getAllProductCollections: "/productCollections",
  // createProductCollection: "/productCollections",

  // templates
  getAllProductTemplates: "/productTemplates",
  // createProductTemplate: "/productTemplates",

  // items
  getAllProductItems: "/productItems",
  // updateProductItems: "/productItems",
  // createProductItem: "/productItems",
};

// user
export const userLogin = (email, password) => {
  return POST(api.userLogin, { email, password });
};

export const userRegister = (organizationName, email, password) => {
  return POST(api.userRegister, { organizationName, email, password });
};

export const userLogout = () => {
  return POST(api.userLogout);
};

// collections
export const createProductCollection = ({ name, templateId, codePrefix }) => {
  return POST(api.createProductCollection, { name, templateId, codePrefix });
};

// templates
export const createProductTemplate = ({ name, names }) => {
  return POST(api.createProductTemplate, { name, names });
};

// product items
// export const updateProductItems = ({ items }) => {
//   return PUT(api.updateProductItems, { items });
// };

export const createProductItem = ({ details, collectionId, code }) => {
  return POST(api.createProductItem, { details, collectionId, code });
};
