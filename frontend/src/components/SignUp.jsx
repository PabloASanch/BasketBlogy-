import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { FiEye, FiEyeOff } from 'react-icons/fi'; 

const saltRounds = 10;

export const SignUp = () => {
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false); 

  const inputsHandler = (e) => {
    setUserForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (userForm.password !== userForm.confirmPassword) {
      console.log('Password and confirm password do not match');
      return;
    }

    const key = uuidv4();

    bcrypt.hash(userForm.password, saltRounds, (err, hash) => {
      if (err) {
        console.error('Error while hashing password:', err);
      } else {
        axios
          .post('http://localhost:4000/users/addUser', {
            username: userForm.username,
            email: userForm.email,
            password: hash,
            key,
            pfp: "http://lilithaengineering.co.za/wp-content/uploads/2017/08/person-placeholder.jpg",
          })
          .then(() => {
            setUserForm({ username: '', email: '', password: '', confirmPassword: '' });
            return navigate("/signin")
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    });
  };

  useEffect(() => {}, []);

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:mt-14 lg:py-0">
        <div className="w-4/5 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Create an Account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-red-500"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Enter your username"
                  required
                  onChange={inputsHandler}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-red-500"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@email.com"
                  required
                  onChange={inputsHandler}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-red-500"
                >
                  Password
                </label>
    
                <input
                  type={showPassword ? 'text' : 'password'} 
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                  onChange={inputsHandler}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-2 text-gray-400 focus:outline-none mb-2"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
                
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-red-500"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                  onChange={inputsHandler}
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-black">
                    I accept the{' '}
                    <a
                      className="font-medium hover:underline text-black"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-red-500 rounded-lg text-sm font-semibold px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Already have an account?{' '}
                <Link
                  to={'/signin'}
                  className="font-medium text-primary-600 hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
