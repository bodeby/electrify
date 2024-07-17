// import NextAuth, { User, NextAuthConfig } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

/* const demo_users = [
  {
    id: "ajsdjsdsjasdas",
    name: "Frederik Bode",
    userName: "bodeby",
    password: "luna123",
    email: "thorbensen@gmail.com",
  },
  {
    id: "ajsdjsdsjasdaskasdkasdk",
    name: "Per Bode",
    userName: "pbode",
    password: "luna456",
    email: "per@gmail.com",
  },
];

export const BASE_PATH = "api/auth";

const authConfig: NextAuthConfig = {
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "bodeby" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        // simple user check
        const user = demo_users.find(
          (user) =>
            user.userName == credentials.username &&
            user.password == credentials.password
        );

        return user
          ? { id: user.id, name: user.name, email: user.email }
          : null;
      },
    }),
  ],
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig); */
