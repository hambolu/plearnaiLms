export default function Cards({ auth, enrollment, course, allCourse }) {
    console.log(auth)
    return (
        <div>
            <div className="mb-2 h-90  dark:bg-gray-800 p-6 rounded-md ">
                <h3 className="text-lg font-normal text-black">
                    Hi, Welcome Back
                </h3>
                <div className="text-sm mb-3 font-normal text-white dark:text-white" />

                <p className="text-gray-600 dark:text-gray-400 mt-2"></p>
                {/* Add more details or actions as needed */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className=" pl-4 pt-10 items-center justify-center h-40 rounded bg-gradient-to-r from-blue-50 via-pink-50 to-blue-100 shadow-sm">
                        <div class=" inset-0 bg-opacity-40 backdrop-blur-md">
                            <p className="flex text-2xl text-black dark:text-white-500">
                                <svg
                                    className="w-3.5 h-5 "
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 18"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 1v16M1 9h16"
                                    />
                                </svg>
                                <span className="ml-2 pt-1 text-xs items-center justify-center uppercase">
                                    Courses {auth.user.role === 'user' ? enrollment.length :
 auth.user.role === 'instructor' ? course.length :
 auth.user.role === 'admin' ? allCourse.length : null}


                                </span>
                            </p>
                        </div>
                    </div>
                    <div className=" pl-4 pt-10 items-center justify-center h-40 rounded bg-gradient-to-r from-blue-50 via-pink-50 to-blue-100 shadow-sm">
                        <div class=" inset-0 bg-opacity-40 backdrop-blur-md">
                            <p className="flex text-2xl text-black dark:text-white-500">
                                <svg
                                    className="w-3.5 h-5 "
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 18"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 1v16M1 9h16"
                                    />
                                </svg>
                                <span className="ml-2 pt-1 text-xs items-center justify-center uppercase">
                                    Courses {auth.user.role === 'user' ? enrollment.length :
 auth.user.role === 'instructor' ? course.length :
 auth.user.role === 'admin' ? allCourse.length : null}


                                </span>
                            </p>
                        </div>
                    </div>
                    <div className=" pl-4 pt-10 items-center justify-center h-40 rounded bg-gradient-to-r from-blue-50 via-pink-50 to-blue-100 shadow-sm">
                        <div class=" inset-0 bg-opacity-40 backdrop-blur-md">
                            <p className="flex text-2xl text-black dark:text-white-500">
                                <svg
                                    className="w-3.5 h-5 "
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 18"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 1v16M1 9h16"
                                    />
                                </svg>
                                <span className="ml-2 pt-1 text-xs items-center justify-center uppercase">
                                    Courses {auth.user.role === 'user' ? enrollment.length :
 auth.user.role === 'instructor' ? course.length :
 auth.user.role === 'admin' ? allCourse.length : null}


                                </span>
                            </p>
                        </div>
                    </div>
                    <div className=" pl-4 pt-10 items-center justify-center h-40 rounded bg-gradient-to-r from-blue-50 via-pink-50 to-blue-100 shadow-sm">
                        <div class=" inset-0 bg-opacity-40 backdrop-blur-md">
                            <p className="flex text-2xl text-black dark:text-white-500">
                                <svg
                                    className="w-3.5 h-5 "
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 18"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 1v16M1 9h16"
                                    />
                                </svg>
                                <span className="ml-2 pt-1 text-xs items-center justify-center uppercase">
                                    Courses {auth.user.role === 'user' ? enrollment.length :
 auth.user.role === 'instructor' ? course.length :
 auth.user.role === 'admin' ? allCourse.length : null}


                                </span>
                            </p>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    );
}
