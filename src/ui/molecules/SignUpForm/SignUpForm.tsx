"use client";

import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { signup } from "@/actions/auth";
import styles from "./styles.module.css";

function InputItem(p: {
  label: string;
  name: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: HTMLInputAutoCompleteAttribute;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={p.name}>{p.label}</label>
      <input
        id={p.name}
        name={p.name}
        type={p.type ?? "text"}
        placeholder={p.placeholder}
        autoComplete={p.autoComplete}
        required
      />
    </div>
  );
}

function SignupButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.submit} aria-disabled={pending}>
      {pending ? "Registering..." : "Register"}
    </button>
  );
}

export function SignUpForm() {
  const [state, action] = useFormState(signup, undefined);

  return (
    <form className={styles.form} action={action}>
      <InputItem
        name="username"
        label="Username"
        placeholder="Your_username42"
        autoComplete="username"
      />
      <InputItem
        name="email"
        label="Email"
        placeholder="some.name@provider.com"
        type="email"
        autoComplete="email"
      />
      <InputItem
        name="password"
        label="Password"
        placeholder="my-str0ng-p4ssword!!"
        type="password"
        autoComplete="new-password"
      />
      <InputItem
        name="passwordConfirmation"
        label="Confirm password"
        placeholder="the same password as above"
        type="password"
      />
      <SignupButton />
    </form>
  );
}
