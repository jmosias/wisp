"use client";

import { userLogin } from "@/app/_lib/api";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import validator from "validator";

export default function LoginForm() {
  const { push } = useRouter();

  const [form, setForm] = useState({
    email: { value: "", error: "" },
    password: { value: "", error: "" },
  });
  const [formError, setFormError] = useState("");

  const handleInputChange = (name, value) => {
    setFormError("");
    setForm((prevForm) => ({
      ...prevForm,
      [name]: { ...prevForm[name], value, error: "" },
    }));
  };

  const validateForm = () => {
    setFormError("");
    const newForm = { ...form };
    let isValid = true;

    if (!newForm.email.value || !validator.isEmail(newForm.email.value)) {
      newForm.email.error = "Please type a valid email address";
      isValid = false;
    } else {
      newForm.email.error = "";
    }

    if (!newForm.password.value) {
      newForm.password.error = "Please type a password";
      isValid = false;
    } else {
      newForm.password.error = "";
    }

    setForm(newForm);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await userLogin(form.email.value, form.password.value);
      push("/app");
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <p className="pb-4 text-2xl font-bold">Login</p>
        <div className="flex flex-col gap-4">
          <Input
            type="email"
            label="Email"
            value={form.email.value}
            onValueChange={(value) => handleInputChange("email", value)}
            isInvalid={!!form.email.error || !!formError}
            errorMessage={form.email.error}
            variant="bordered"
            size="md"
            labelPlacement="outside"
            placeholder="&#8203;"
          ></Input>
          <Input
            type="password"
            label="Password"
            value={form.password.value}
            onValueChange={(value) => handleInputChange("password", value)}
            isInvalid={!!form.password.error || !!formError}
            errorMessage={form.password.error}
            variant="bordered"
            size="md"
            labelPlacement="outside"
            placeholder="&#8203;"
          ></Input>
        </div>
        <p className="text-danger text-sm">{formError}</p>
      </div>
      <Button className="p-2 font-bold" onClick={handleLogin} color="primary">
        Login
      </Button>
    </div>
  );
}
