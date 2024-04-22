import type { SessionPayload } from "@/actions/auth";
import { Gravatar } from "@/ui/elements/Gravatar/Gravatar";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import Link from "next/link";

export function NavBarAuthControl() {
  const session = cookies().get("session")?.value;
  const sessionData = session ? decodeJwt<SessionPayload>(session) : null;

  if (!sessionData) {
    return (
      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
      </ul>
    );
  }

  return (
    <ul>
      <li>
        <a
          href="#"
          className="dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <Gravatar hash={sessionData.gravatarUrl} size={24} />{" "}
          {sessionData.username}
        </a>
        <ul>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/blocklist">Block List</Link>
          </li>
          <li>
            <Link href="/logout">Logout</Link>
          </li>
        </ul>
      </li>
    </ul>
  );
}
