import { NextApiRequest } from "next";
import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserInfo } from "remult";

const valideUsers: UserInfo[] = [
  { id: "1", name: "Lula", roles: ["admin"] },
  { id: "2", name: "Bolsonaro" },
];

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        name: {
          label: "Username",
          placeholder: "Try Lula or Bolsonaro",
        },
      },
      authorize: (credentials) =>
        valideUsers.find((user) => user.name === credentials?.name) || null,
    }),
  ],
});

export async function getUserFromNextAuth(req: NextApiRequest) {
  const token = await getToken({ req });
  return valideUsers.find((user) => user.id === token?.sub);
}
