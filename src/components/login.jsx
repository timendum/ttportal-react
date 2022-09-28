import React from "react";
import { ttRss } from "../ttrss.js";

export default function LoginPage({ handleLogin }) {
  const [loginError, setloginError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    let ttLocation = data.get("location");
    ttLocation = ttLocation.replace(/\/+$/, "");
    ttRss.base = ttLocation + "/api/";
    setloginError();
    ttRss
      .login(data.get("user"), data.get("password"))
      .then((result) => {
        console.log(result);
        if (result) {
          handleLogin(true);
        } else {
          setloginError("Error during login, check console.");
          setLoading(false);
        }
      })
      .catch(console.log);
  };
  return (
    <div className="h-screen w-1/2 mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mt-3 block p-6 rounded-lg shadow-lg bg-white ">
          <h2 className="text-xl mr-4 my-2">Login</h2>
          <div className="mb-6">
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Username"
              name="user"
            />
          </div>
          <div className="mb-6">
            <input
              autoComplete="current-password"
              type="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Password"
              name="password"
            />
          </div>
          <div className="mb-6">
            <input
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Username"
              name="location"
              label="TT-RSS Base URL"
              defaultValue={
                document.location.protocol +
                "//" +
                document.location.hostname +
                ":" +
                document.location.port +
                "/"
              }
            />
          </div>{" "}
          {loginError && (
            <div role="alert">
              <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                {loginError}
              </div>
            </div>
          )}
          <button
            type="submit"
            className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            disabled={loading}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
