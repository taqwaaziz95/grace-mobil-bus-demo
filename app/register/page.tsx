"use client";
import { useState } from "react";
import Layout from "../../components/layout/Layout";
import Link from "next/link";

export default function Register() {
  const [isAgree, setIsAgree] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgree(e.target.checked);
  };

  return (
    <>
      <Layout footerStyle={1}>
        <div className="container pt-140 pb-170">
          <div className="row">
            <div className="col-lg-5 mx-auto">
              <div className="register-content border rounded-3 px-md-5 px-3 ptb-50">
                <div className="text-center">
                  <p className="neutral-1000 px-4 py-2 bg-2 text-sm-bold rounded-12 d-inline-flex align-items-center">
                    Register
                  </p>
                  <h4 className="neutral-1000">Create an Account</h4>
                </div>
                <div className="form-login mt-30">
                  <form action="#">
                    <div className="form-group">
                      <input
                        className="form-control username"
                        type="text"
                        placeholder="Full Name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control email"
                        type="text"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control phone"
                        type="text"
                        placeholder="Phone Number"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control password"
                        type="password"
                        placeholder="Password"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control password"
                        type="password"
                        placeholder="Confirm Password"
                      />
                    </div>
                    <div className="form-group">
                      <select className="form-control">
                        <option value="member">Member</option>
                        <option value="non-member">Non-Member</option>
                      </select>
                    </div>
                    <div className="form-group my-3">
                      <div className="box-remember-forgot">
                        <div className="remeber-me d-flex align-items-center neutral-500">
                          <input
                            className="cb-remember"
                            type="checkbox"
                            checked={isAgree}
                            onChange={handleCheckboxChange}
                          />
                          I agree to terms and conditions
                        </div>
                      </div>
                    </div>
                    <div className="form-group mb-30">
                      <button
                        className="btn btn-primary w-100"
                        type="submit"
                        disabled={!isAgree}
                      >
                        Submit
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

                    <p className="text-sm-medium neutral-500 text-center mt-70">
                      Already have an account?{" "}
                      <Link className="neutral-1000" href="/login">
                        Login Here!
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
