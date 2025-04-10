import React from 'react';
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <div>


            <footer className="bg-white dark:bg-gray-900">
                <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                    <div className="md:flex md:justify-between">
                        <div className="mb-6 md:mb-0">
                            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">

                                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                    JEEVIKA
                                </span>

                            </a>
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">

                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Quick</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">

                                    <li className="mb-4">
                                        <Link to="/" className="hover:underline">
                                            Home
                                        </Link>

                                    </li>
                                    <li className="mb-4">
                                        <Link to="/Hire" className="hover:underline">
                                            Company
                                        </Link>

                                    </li>
                                    <li>
                                        <Link to="/Employee" className="hover:underline">
                                            Employee
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="https://flowbite.com/" className="hover:underline">JEEVIKA™</a>. All Rights Reserved.
                        </span>
                        <div className="flex mt-4 sm:justify-center sm:mt-0">

                            <a href="https://x.com/jeevikaa2024?s=21"  className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5" target="_blank"> 
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                                    <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd" />
                                </svg>
                                <span className="sr-only">Twitter page</span>
                            </a>

                            <a href="https://www.linkedin.com/company/jeevikaa/about/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5 " target="_blank">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0ZM7.12 20.45H3.56V9h3.56v11.45ZM5.34 7.51a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96v5.7h-3.56V9h3.42v1.56h.05c.48-.91 1.66-1.87 3.42-1.87 3.66 0 4.34 2.41 4.34 5.54v6.22Z" />
                                </svg>
                                <span className="sr-only">LinkedIn page</span>
                            </a>

                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}

export default Footer;
