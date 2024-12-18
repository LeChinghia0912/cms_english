export const authServices = {
  verifyAccount: async (credentials) => {
    const res = await fetch({
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "auth/login",
    });
    
    if (res.status !== 200) return null;

    const user = await res.json();

    return user;
  },

  refreshToken: async (refreshToken) => {
    const res = await fetch({
      method: "GET",
      cache: "no-store",
      headers: { Authorization: `Bearer ${refreshToken}` },
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "auth/refresh-token",
    });

    if (res.status !== 200) return null;

    const user = await res.json();

    return user;
  },

  logout: async () => {
    // Implement logout logic here
  },
};
