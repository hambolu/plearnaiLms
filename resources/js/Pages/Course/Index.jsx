import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Button } from "flowbite-react";
import { usePage } from "@inertiajs/react";
import DOMPurify from "dompurify";

const baseUrl = "http://localhost:8000/images/";
export default function CourseIndex({ auth, courses, categories }) {
    const { url } = usePage();
    const [selectedCategory, setSelectedCategory] = useState(null);

    const sanitizedDescription = (description) => {
        return { __html: DOMPurify.sanitize(description) };
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value === "null" ? null : e.target.value);
    };

    const filteredCourses = selectedCategory
        ? courses.data.filter(
              (course) => course.category_id === parseInt(selectedCategory)
          )
        : courses.data;

    const truncateText = (text, maxLength) => {
        return text.length > maxLength
            ? text.slice(0, maxLength) + "..."
            : text;
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title=" Courses" />

            <div className="py-1">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white  border-gray-200">
                            {(auth.user.role === "instructor" ||
                                        auth.user.role === "admin") && (
                                            <div>
                                        <Link
                                            href={route("course.create")}
                                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        >
                                            Create New Course
                                        </Link>
                                       
                                    </div>
                                    )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
                                <div className="md:col-auto">
                                    <h2 className="text-2xl font-semibold mb-4">
                                        Our Courses
                                    </h2>
                                </div>

                                
                                <div className="md:col-auto flex justify-end">
                                <div className="flex text-sm">
                                        Filter by Category:
                                    </div>
                                    <select
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                        className="bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="null">
                                            All Categories
                                        </option>
                                        {/* Add options for categories */}

                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                                {filteredCourses.map((course) => (
                                    <div
                                        key={course.id}
                                        className="max-w-sm h-85 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        {course.image && (
                                            <img
                                                className="rounded-t-lg"
                                                src={`${baseUrl}${course.image}`}
                                                alt={course.title}
                                            />
                                        )}
                                        <div class="p-5">
                                        <h3 className="text-md font-normal mb-2">
                                            <Link
                                                href={route(
                                                    "course.show",
                                                    course.id
                                                )}
                                                className="text-blue-500 text-small"
                                            >
                                                {course.title}
                                            </Link>
                                        </h3>
                                        <div
                                            className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                                            dangerouslySetInnerHTML={{
                                                __html: truncateText(
                                                    course.description,
                                                    50
                                                ),
                                            }}
                                        />
                                        <div className="flex font-bold">
                                            ₦{course.price}
                                        </div>
                                        <div className="flex">
                                            <Link
                                                href={route(
                                                    "course.show",
                                                    course.id
                                                )}
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                See more...
                                            </Link>
                                            &nbsp;
                                            {auth.user.id ===
                                                course.user_id && (
                                                <Link
                                                    href={route(
                                                        "course.edit",
                                                        course.id
                                                    )}
                                                    className="text-blue-500 text-small"
                                                >
                                                    Edit
                                                </Link>
                                            )}
                                        </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination Links */}
                            {courses.meta && (
                                <div className="mt-4">
                                    {courses.links.previous && (
                                        <Link
                                            href={`${url}?page=${
                                                courses.meta.current_page - 1
                                            }`}
                                            className="text-blue-500 p-2 text-small"
                                        >
                                            Previous
                                        </Link>
                                    )}

                                    {courses.meta.total > 1 && (
                                        <span className="mx-2">
                                            Page {courses.meta.current_page} of{" "}
                                            {courses.meta.last_page}
                                        </span>
                                    )}

                                    {courses.links.next && (
                                        <Link
                                            href={`${url}?page=${
                                                courses.meta.current_page + 1
                                            }`}
                                            className="text-blue-500 p-2 text-small"
                                        >
                                            Next
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
