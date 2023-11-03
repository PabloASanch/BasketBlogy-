import { Link } from "react-router-dom";

export const Index = () => {
  const checkLoggedIn = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    return isLoggedIn === "true"; 
  };

  return (
    <section className="bg-white flex justify-center">
      <div className="grid max-w-screen-xl lg:py-16 lg:grid-cols-12 gap-24">
        <div className="mr-auto place-self-center lg:col-span-7 ml-32">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-red-500">
            BasketBlogy!
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
            Best social basketball blog on the web. Get all the latest opinions
            and insights in the NBA
          </p>
          {checkLoggedIn() ? (
            <Link
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 hover:scale-110 hover:transition-transform transition-transform"
              to="/post"
            >
              View Posty's
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          ) : (
            <Link
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 hover:scale-110 hover:transition-transform transition-transform"
              to="/signup"
            >
              Sign Up
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          )}
        </div>
        <div className="hidden lg:mt-0 lg:col-span-4 lg:flex ml-8">
          <img
            src="/a6b5b9de8a56609646f6a805e8b173d0.png"
            alt="mockup"
            className="w-72 hover:scale-105 transition-transform"
          />
        </div>
      </div>
    </section>
  );
};
