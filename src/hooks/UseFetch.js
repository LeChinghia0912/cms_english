import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { get } from "lodash";
import { getServerSession } from "next-auth";

const UseFetch = async (path, options) => {
  const session = await getServerSession(authOptions);
  const accessToken = get(session, ["tokens", "access_token"]);

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + path, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      ...options,
    });

    const data = await res.json();

    // if (data.meta.code === 401 || data.meta.code === 403) return null;

    return { data };
  } catch (error) {
    return {
      data: null,
    };
  }
};

export default UseFetch;
