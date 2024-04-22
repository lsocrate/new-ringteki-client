"use server";

import crypto from "crypto";
import { decodeJwt, jwtVerify, SignJWT } from "jose";
import { z } from "zod";
import { hashPassword } from "@/lib/passwords/passwords";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SignupSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(12).max(72),
  passwordConfirmation: z.string(),
});

type FormState = undefined | { errors?: {}; message?: string };

type User = {
  id: string;
  username: string;
  email: string;
  password: string;
};
const users = [] as Array<User>;

export async function signup(state: FormState, formData: FormData) {
  const parsedFields = SignupSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirmation: formData.get("passwordConfirmation"),
  });
  if (!parsedFields.success) {
    return { errors: parsedFields.error.flatten().fieldErrors };
  }

  if (parsedFields.data.password !== parsedFields.data.passwordConfirmation) {
    return { errors: { passwordConfirmation: "Passwords do not match" } };
  }
  if (users.some((user) => user.email === parsedFields.data.email)) {
    return { errors: { email: "Email already in use" } };
  }
  if (users.some((user) => user.username === parsedFields.data.username)) {
    return { errors: { username: "Username already in use" } };
  }

  const hashedPassword = await hashPassword(parsedFields.data.password);
  const user = {
    id: crypto.randomUUID(),
    username: parsedFields.data.username,
    email: parsedFields.data.email,
    password: hashedPassword,
  };
  users.push(user);

  await createSession(user);
  redirect("/play");
}

export type SessionPayload = {
  userId: string;
  expiresAt: Date;
  gravatarUrl: string;
  username: string;
};

const secretKey = "banana";
const encodedKey = new TextEncoder().encode(secretKey);

function gravatarUrl(email: string) {
  return crypto
    .createHash("sha256")
    .update(email.trim().toLowerCase())
    .digest("hex");
}

async function createSession(user: User) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encryptSession({
    userId: user.id,
    expiresAt,
    username: user.username,
    gravatarUrl: gravatarUrl(user.email),
  });
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

async function encryptSession(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

async function verify(session = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

function decryptSession(session: string) {
  return decodeJwt(session);
}
