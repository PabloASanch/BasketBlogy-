import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const SignIn = ({setIsLoggedIn, setUser}) => {
  const navigate = useNavigate();
  const [signInForm, setSignInForm] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setSignInForm({
      ...signInForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
  
    axios
      .post('http://localhost:4000/users/signin', {
        email: signInForm.email,
        password: signInForm.password,
      })
      .then((response) => {
        setIsLoggedIn(true);
        const userData = {
          username: response.data.user.username,
          key: response.data.user.key,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); 
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Sign-in error:', error);
      });
  };
  

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:mt-36 lg:py-0">
        <div className="w-4/5 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign In
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSignIn}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-red-500">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@email.com"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-red-500">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-red-500 rounded-lg text-sm font-semibold px-5 py-2.5 text-center"
              >
                Sign In
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Dont have an account?{' '}
                <Link
                  to={'/signup'}
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign Up 
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
