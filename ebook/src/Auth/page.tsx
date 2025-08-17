// src/pages/Auth.tsx
import { useState } from "react";
import { useUserLoginStore } from "../hooks/store";
import { message, Spin } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

export default function Auth() {
  type FormState = {
    firstname: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    email: string;
  };
  type fields =
    | "firstname"
    | "lastName"
    | "password"
    | "confirmPassword"
    | "email";
  const updateUserStateStore = useUserLoginStore(
    (state) => state.updateUserState
  );
  const navigate = useNavigate();
  const isRegistered = useUserLoginStore((state) => state.isRegistered);
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formState, setFormState] = useState<FormState>({
    firstname: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const validateFields = [
    {
      check: formState.firstname.trim() !== "",
      message: "First name is required",
      type: "warning",
    },
    {
      check: formState.lastName.trim() !== "",
      message: "Last name is required",
      type: "warning",
    },
    {
      check: formState.email.trim() !== "",
      message: "Email is required",
      type: "warning",
    },
    {
      check: formState.password.trim() !== "",
      message: "Password is required",
      type: "warning",
    },
    {
      check: formState.password.trim().length >= 8,
      message: "Password must be at least 8 characters",
      type: "warning",
    },
    {
      check: formState.confirmPassword.trim() !== "",
      message: "Confirm password is required",
      type: "warning",
    },
    {
      check: formState.confirmPassword.trim() === formState.password.trim(),
      message: "Confirm password does not match",
      type: "warning",
    },
  ];
  function Register() {
    setLoading(true);
    axios
      .post(`https://ebook-dbm9.onrender.com/members/api/register`, {
        email: formState.email,
        passwordHash: formState.password,
        userName: `${formState.firstname} ${formState.lastName}`,
      })
      .then(() => {
        messageApi.open({
          type: "success",
          content: "Registered successfully!",
        });
        updateUserStateStore({
          email: formState.email,
          name: `${formState.firstname} ${formState.lastName}`,
          password: formState.password,
          isRegistered: true,
          isSignedIn: false,
        });
        setLoading(false);
        setIsSignIn(true);
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        setLoading(false);
        messageApi.open({
          type: "error",
          content: `${error.response.data.message}`,
        });
      });
  }
  function SignIn() {
    setLoading(true);
    axios
      .get(
        `https://ebook-dbm9.onrender.com/members/api/user?email=${formState.email}&passwordHash=${formState.password}`
      )
      .then((res) => {
        messageApi.open({
          type: "success",
          content: "Sign in successful!",
        });
        updateUserStateStore({
          email: formState.email,
          name: `${formState.firstname} ${formState.lastName}`,
          password: formState.password,
          isRegistered: true,
          isSignedIn: true,
        });
        setLoading(false);
        res.data.role === "USER" && isRegistered === true
          ? navigate("/ebook")
          : res.data.role === "ADMIN"
          ? navigate("/admin")
          : navigate("/");
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        setLoading(false);
        if (error.response.status === 400) {
          messageApi.open({
            type: "warning",
            content: "User not found. Please register.",
          });
          return;
        } else {
          messageApi.open({
            type: "error",
            content: `${error.response.data.message}`,
          });
        }
      });
  }
  function updateFormState(key: fields, value: string) {
    setFormState((prev: FormState) => ({ ...prev, [key]: value }));
  }
  function ValidateUserBeforeRegister(isSignIn: boolean) {
    let isValidForRegisterOrSignIn = isSignIn
      ? validateFields.slice(2, 5).find((field) => !field.check)
      : validateFields.find((field) => !field.check);
    if (isValidForRegisterOrSignIn !== undefined) {
      messageApi.open({
        type: "warning",
        content: isValidForRegisterOrSignIn.message,
      });
      return;
    } else {
      return isSignIn ? SignIn() : Register();
    }
  }

  // console.log(formState);
  return (
    <>
      {contextHolder}
      <Spin spinning={loading} size="large"  fullscreen />
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm rounded-lg border bg-white p-6 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h2>

          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
            }}
            className="space-y-4"
          >
            {!isSignIn && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                    value={formState.firstname}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateFormState("firstname", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                    value={formState.lastName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateFormState("lastName", e.target.value)
                    }
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                value={formState.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateFormState("email", e.target.value)
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                  value={formState.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateFormState("password", e.target.value)
                  }
                  required
                />
                {formState.password.length > 1 && (
                  <div
                    className="-ml-10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOutlined className="cursor-pointer pt-4" />
                    ) : (
                      <EyeInvisibleOutlined className="cursor-pointer pt-4" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {!isSignIn && (
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Confirm Password
                </label>
                <div className="flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                    value={formState.confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateFormState("confirmPassword", e.target.value)
                    }
                    required
                  />
                  {formState.confirmPassword.length > 1 && (
                    <div
                      className="-ml-10"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOutlined className="cursor-pointer pt-4" />
                      ) : (
                        <EyeInvisibleOutlined className="cursor-pointer pt-4" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
            <button
              type="submit"
              className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
              onClick={() => ValidateUserBeforeRegister(isSignIn)}
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            {isSignIn ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="font-medium text-black hover:underline"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn ? "Register" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
