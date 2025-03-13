"use client";
import { useState } from "react";
import Layout from "../../components/layout/Layout";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "telescoope" && password === "tele1234") {
      localStorage.setItem("username", username);
      router.push("/");
    } else {
      alert("Invalid username or password");
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    alert("Password reset link sent to your email");
  };

  return (
    <>
      <Layout footerStyle={1}>
        <div className="container pt-140 pb-170">
          <div className="row">
            <div className="col-lg-5 mx-auto">
              <div className="border rounded-3 px-md-5 px-3 ptb-50">
                <div className="login-content">
                  <div className="text-center">
                    <p className="neutral-1000 px-4 py-2 bg-2 text-sm-bold rounded-12 d-inline-flex align-items-center">
                      {isForgotPassword ? "Forgot Password" : "Sign in"}
                    </p>
                    <h4 className="neutral-1000">
                      {isForgotPassword ? "Forgot Password" : "Welcome back"}
                    </h4>
                  </div>
                  <div className="form-login mt-30">
                    <form
                      onSubmit={
                        isForgotPassword ? handleForgotPassword : handleLogin
                      }
                    >
                      <div className="form-group">
                        <input
                          className="form-control username"
                          type="text"
                          placeholder="Email / Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      {!isForgotPassword && (
                        <div className="form-group">
                          <input
                            className="form-control password"
                            type="password"
                            placeholder="****************"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      )}

                      {!isForgotPassword && (
                        <div className="form-group">
                          <div className="box-remember-forgot">
                            <div className="remeber-me">
                              <label className="text-xs-medium neutral-500">
                                {" "}
                                <input
                                  className="cb-remember"
                                  type="checkbox"
                                />
                                Remember me{" "}
                              </label>
                            </div>
                            <div className="forgotpass">
                              <button
                                type="button"
                                className="text-xs-medium neutral-500"
                                onClick={() => setIsForgotPassword(true)}
                              >
                                Forgot password?
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="form-group mb-30">
                        <button className="btn btn-primary w-100" type="submit">
                          {isForgotPassword ? "Submit" : "Sign in"}
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 15L15 8L8 1M15 8L1 8"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                      {!isForgotPassword && (
                        <p className="text-sm-medium neutral-500 text-center mt-70">
                          Don’t have an account?{" "}
                          <Link className="neutral-1000" href="/register">
                            Register Here !
                          </Link>
                        </p>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
