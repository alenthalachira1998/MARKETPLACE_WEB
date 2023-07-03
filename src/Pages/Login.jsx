import { useState } from "react";
import PasswordMaskingInput from "../components/User/PasswordVisible";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here using email and password state values
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="flex min-h-full  flex-col justify-center px-6 py-12 lg:px-8">
      <span className="font-medium">LOGIN</span>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="">
            <div className="flex">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
            </div>
            <div className="">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          </div>

          <div className="">
            <div className="flex items-center justify-start">
              <label htmlFor="password" className="block text-sm  font-medium  leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="">
              <PasswordMaskingInput
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>

          <div className="">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
