import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    // This function runs after a user signs in

    // Googleアカウントでサインインした場合、ユーザーが存在しない場合は新規作成
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const email = user.email;
        const existingUser = await prisma.user.findUnique({
          where: { email: email || "" },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name,
              email: email,
              image: user.image,
              officeId: "f5164b67-2e05-480f-8c07-2a642ef01c93", // Replace with actual default office ID
              departmentId: "cm7kdj5vp0000e2f8uu9y4wl7", // Replace with actual default department ID
            },
          });
        }
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };