// Enrollment.jsx
import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import DOMPurify from "dompurify";

const EnrollmentIndex = ({ auth, enrollments }) => {
    const baseUrl = "http://localhost:8000/images/";

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Enrollments" />

            <div className="py-1">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-2">
                    <div className="bg-white overflow-hidden sm:rounded-lg">
                        <div className="p-6 bg-white">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-1 ">
                                    <h2 className="text-2xl font-semibold mb-4 ">
                                        My Courses
                                    </h2>
                                </div>
                                <div className="md:col-span-1 flex items-center justify-center">
                                    <div className="flex items-center">
                                        {/* Add search functionality */}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {enrollments.map((enrollment) => (
                                    <div
                                        key={enrollment.id}
                                        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        {enrollment.course.image && (
                                            <img
                                                className=" rounded-t-lg "
                                                src={`${baseUrl}${enrollment.course.image}`}
                                                alt=""
                                            />
                                        )}
                                        <div className="p-2">
                                        <h3 className="text-md font-normal mb-2">
                                            {enrollment.course.title}
                                        </h3>
                                        <div
                                            className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                                            dangerouslySetInnerHTML={{
                                                __html: truncateText(
                                                    enrollment.course.description,
                                                    50
                                                ),
                                            }}
                                        />
                                        <div className="flex">
                                            <Link
                                                href={route(
                                                    "enrollments.show",
                                                    enrollment.course.id
                                                )}
                                                className="text-blue-500 p-2 text-small"
                                            >
                                                {enrollment.completed !== null ? (
                                                    <p>Completed</p>
                                                ):(
                                                    <p>Continue</p>
                                                )}
                                            </Link>
                                        </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EnrollmentIndex;
