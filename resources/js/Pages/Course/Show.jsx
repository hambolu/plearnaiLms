// resources/js/Pages/Course/Show.jsx
import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import DOMPurify from "dompurify";

const baseUrl = "http://localhost:8000/images/";
export default function Show({ auth, course }) {
    const sanitizedDescription = DOMPurify.sanitize(course.description);
    const sanitizedPrerequisites = DOMPurify.sanitize(course.prerequisites);
    const calculateAmount = () => {
        // Implement your logic to calculate the enrollment fee
        return course.price;
    };
    const generateTransactionRef = () => {
        // Implement your logic to generate a unique transaction reference
        return `TXN-${Date.now()}`;
    };
    const initiateStripePayment = async ({
        courseId,
        userId,
        amount,
        transactionRef,
    }) => {
        try {
            // Step 1: Create a payment intent on the server
            const formData = new URLSearchParams();
            formData.append("course_id", courseId);
            formData.append("user_id", userId);
            formData.append("amount", amount);
            formData.append("transaction_ref", transactionRef);

            // Step 1: Create a payment intent on the server
            const response = await fetch("/api/payment/create", {
                method: "POST",
                body: formData, // Use FormData instead of JSON.stringify
            });
            const data = await response.json();
            if (data.message === "successfull") {
                //toast.success("Course created successfully!");

                window.location.href = data.redirect_url;
                // ... handle successful response (e.g., redirect)
            } else {
                // Display error toast
                toast.error(data.message);
            }
            //console.log(formData, course.discount, course.price);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };
    const handleEnrollNow = () => {
        const courseId = course.id;
        const userId = auth.user.id;
        const amount = calculateAmount(); // Implement a function to calculate the amount

        // Generate transaction reference (you can use a library or create a unique identifier)
        const transactionRef = generateTransactionRef();

        // Initiate Stripe payment
        initiateStripePayment({ courseId, userId, amount, transactionRef });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Course Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {course.image && (
                                <img
                                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                                    src={`${baseUrl}${course.image}`}
                                    alt=""
                                />
                            )}

                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                                    {course.title}
                                    <div className="flex">
                                        {(auth.user.id === course.user_id ) && (
                                          <div>
                                            <Link
                                                href={route(
                                                    "course.edit",
                                                    course.id
                                                )}
                                                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 p-2 text-small"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                            href={route("lessons.create", { courseId: course.id })}
                                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        >
                                            Create Lesson
                                        </Link>
                                        </div>
                                        )}
                                    </div>
                                </h2>

                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-8">
                                    <div className="p-6 bg-white border-b border-gray-200">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                            Course Description
                                        </h3>
                                        <div className="prose max-w-full">
                                            {/* Insert sanitized ReactQuill content here */}
                                            <div
                                                className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                                                dangerouslySetInnerHTML={{
                                                    __html: sanitizedDescription,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-8">
                                    <div className="p-6 bg-white border-b border-gray-200">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                            Additional Details
                                        </h3>
                                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                                            <div className="mb-4">
                                                <dt className="text-sm font-medium">
                                                    Instructor:
                                                </dt>
                                                <dd className="mt-1 text-sm">
                                                    {course.instructor}
                                                </dd>
                                            </div>
                                            <div className="mb-4">
                                                <dt className="text-sm font-medium">
                                                    Duration:
                                                </dt>
                                                <dd className="mt-1 text-sm">
                                                    {course.duration}
                                                </dd>
                                            </div>
                                            <div className="mb-4">
                                                <dt className="text-sm font-medium">
                                                    Prerequisites:
                                                </dt>
                                                <dd className="mt-1 text-sm">
                                                    <div
                                                        className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                                                        dangerouslySetInnerHTML={{
                                                            __html: sanitizedPrerequisites,
                                                        }}
                                                    />
                                                </dd>
                                            </div>
                                            <div className="mb-4">
                                                <dt className="text-sm font-medium">
                                                    Start Date:
                                                </dt>
                                                <dd className="mt-1 text-sm">
                                                    {course.start_date}
                                                </dd>
                                            </div>
                                            <div className="mb-4">
                                                <dt className="text-sm font-medium">
                                                    End Date:
                                                </dt>
                                                <dd className="mt-1 text-sm">
                                                    {course.end_date}
                                                </dd>
                                            </div>
                                            <div className="mb-4">
                                                <dt className="text-sm font-medium">
                                                    Price:
                                                </dt>
                                                <dd className="mt-1 text-sm">
                                                    {course.price}
                                                </dd>
                                            </div>
                                            <div className="mb-4">
                                                <dt className="text-sm font-medium">
                                                    Discounts:
                                                </dt>
                                                <dd className="mt-1 text-sm">
                                                    {course.discounts}%
                                                </dd>
                                            </div>
                                            {/* Add more details as needed */}
                                        </dl>
                                            
                                        <button
                                            onClick={handleEnrollNow}
                                            className="bg-blue-500 text-white p-2 rounded"
                                        >
                                            Enroll Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
