import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import "react-toastify/dist/ReactToastify.css";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "flowbite-react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "./Constants";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading";

export default function CourseCreate({ auth, mycourse }) {
    const [selectedImage, setSelectedImage] = useState("");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category_id: "",
        duration: "",
        level: "",
        prerequisites: "",
        startDate: "",
        endDate: "",
        image: "",
        price: "",
        discounts: "",
        visibility: "hidden",
        // Add other fields as needed
    });
    const handleQuillChange = (field, value) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
    };

    const truncateText = (text, maxLength) => {
        return text.length > maxLength
            ? text.slice(0, maxLength) + "..."
            : text;
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        // Check if a file is selected
        if (file) {
            // Check the file type
            const allowedTypes = ["image/jpeg", "image/png"];
            if (!allowedTypes.includes(file.type)) {
                alert("Please upload a valid image (JPEG or PNG).");
                e.target.value = null; // Clear the input
                return;
            }

            // Use FileReader to read the file
            const reader = new FileReader();
            reader.onloadend = () => {
                // Create an image element to get the dimensions
                const img = new Image();
                img.onload = () => {
                    // Check the dimensions
                    const maxWidth = 500;
                    const maxHeight = 500;
                    if (img.width < maxWidth || img.height < maxHeight) {
                        alert(
                            `Please upload an image with dimensions up to ${maxWidth}x${maxHeight}.`
                        );
                        e.target.value = null; // Clear the input
                    } else {
                        // Set the selected image
                        setSelectedImage(file);
                    }
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories when the component mounts
        axios
            .get(route("categories.all"))
            .then((response) => setCategories(response.data))
            .catch((error) =>
                console.error("Error fetching categories:", error)
            );
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataForSubmit = new FormData();

            formDataForSubmit.append("title", formData.title);
            formDataForSubmit.append("description", formData.description);
            formDataForSubmit.append("user_id", auth.user.id);
            formDataForSubmit.append("category_id", formData.category_id);
            formDataForSubmit.append("duration", formData.duration);
            formDataForSubmit.append("level", formData.level);
            formDataForSubmit.append("instructor", auth.user.name);
            formDataForSubmit.append("prerequisites", formData.prerequisites);
            formDataForSubmit.append("startDate", formData.startDate);
            formDataForSubmit.append("endDate", formData.endDate);
            formDataForSubmit.append("image", selectedImage); // Assuming formData.image is a File object
            formDataForSubmit.append("price", formData.price);
            formDataForSubmit.append("discounts", formData.discounts);
            formDataForSubmit.append("visibility", "public");

            try {
                const response = await fetch("/api/courses/create", {
                    method: "POST",
                    body: formDataForSubmit,
                });

                const data = await response.json();
                if (data.message === "successfull") {
                    toast.success("Course created successfully!");
                    window.location.href = "/courses";
                    // ... handle successful response (e.g., redirect)
                } else {
                    // Display error toast
                    toast.error(data.message);
                }
            } catch (error) {
                // Display error toast
                toast.error("An error occurred. Please try again.");
            }
        } catch (error) {
            toast.error("Server error. Please try again.");
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Course" />

            <div className="py-1">
                <div className=" flex max-w-7xl mx-auto sm:px-6 lg:px-1">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex-grow">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-2xl font-semibold mb-2">
                                Create Course
                            </h2>
                            <div className="grid grid-cols-1 gap-4 mb-4">
                                <form onSubmit={handleSubmit}>
                                    <div className=" rounded ">
                                        <div className="mb-2">
                                            <label
                                                htmlFor="title"
                                                className="block text-sm font-medium text-gray-600"
                                            >
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>

                                        <div className="mb-2">
                                            <label
                                                htmlFor="description"
                                                className="block text-sm font-medium text-gray-600"
                                            >
                                                Description
                                            </label>
                                            <ReactQuill
                                                id="description"
                                                theme="snow" // You can customize the theme
                                                value={formData.description}
                                                onChange={(value) =>
                                                    handleQuillChange(
                                                        "description",
                                                        value
                                                    )
                                                }
                                                modules={modules}
                                                formats={formats}
                                                readOnly={false}
                                                preserveWhitespace
                                                style={{ height: "200px" }}
                                                className="mb-10 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="category_id"
                                                className="block text-sm font-medium text-gray-600"
                                            >
                                                Category
                                            </label>
                                            <select
                                                id="category_id"
                                                name="category_id"
                                                value={formData.category_id}
                                                onChange={handleChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option value="">
                                                    Select a category
                                                </option>
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

                                        <div className="mb-2 ">
                                            <label
                                                htmlFor="duration"
                                                className="block text-sm font-medium text-gray-600"
                                            >
                                                Duration (weeks)
                                            </label>
                                            <input
                                                type="text"
                                                id="duration"
                                                name="duration"
                                                value={formData.duration}
                                                onChange={handleChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="level"
                                                className="block text-sm font-medium text-gray-600"
                                            >
                                                Level
                                            </label>
                                            <input
                                                type="text"
                                                id="level"
                                                name="level"
                                                value={formData.level}
                                                onChange={handleChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="price"
                                                className="block text-sm font-medium text-gray-600"
                                            >
                                                Price
                                            </label>
                                            <input
                                                type="number"
                                                id="price"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                pattern="\d+"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="discounts"
                                                className="block text-sm font-medium text-gray-600"
                                            >
                                                Discount (%)
                                            </label>
                                            <input
                                                type="number"
                                                id="discounts"
                                                name="discounts"
                                                value={formData.discounts}
                                                onChange={handleChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                pattern="\d+"
                                            />
                                        </div>
                                    </div>
                                    <div className="rounded ">
                                        <div className="mb-10">
                                            <label
                                                htmlFor="prerequisites"
                                                className="block text-sm font-medium text-gray-600"
                                            >
                                                Prerequisites
                                            </label>

                                            <ReactQuill
                                                id="prerequisites"
                                                theme="snow" // You can customize the theme
                                                value={formData.prerequisites}
                                                onChange={(value) =>
                                                    handleQuillChange(
                                                        "prerequisites",
                                                        value
                                                    )
                                                }
                                                modules={modules}
                                                formats={formats}
                                                readOnly={false}
                                                preserveWhitespace
                                                style={{ height: "200px" }}
                                                className="mb-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>

                                        <div className="mb-2">
                                            <label
                                                htmlFor="image"
                                                className="block text-sm font-medium text-gray-600"
                                            >
                                                Course Image
                                            </label>
                                            <input
                                                type="file"
                                                name="image"
                                                accept="image/jpeg, image/png"
                                                capture="environment" // Use "environment" for rear camera on mobile devices
                                                onChange={handleFileChange}
                                            />
                                            {selectedImage && (
                                                <div>
                                                    <p>Selected Image:</p>
                                                    <img
                                                        width="100px"
                                                        src={URL.createObjectURL(
                                                            selectedImage
                                                        )}
                                                        alt="Selected"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-2">
                                            <label
                                                htmlFor="startDate"
                                                className="block text-sm font-medium text-gray-600"
                                            >
                                                Start Date
                                            </label>
                                            <input
                                                type="date"
                                                id="startDate"
                                                name="startDate"
                                                value={formData.startDate}
                                                onChange={handleChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="endDate"
                                                className="block text-sm font-medium text-gray-600"
                                            >
                                                End Date
                                            </label>
                                            <input
                                                type="date"
                                                id="endDate"
                                                name="endDate"
                                                value={formData.endDate}
                                                onChange={handleChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div className=" mb-2">
                                        <Button
                                            type="submit"
                                            className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Create Course
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* My Courses section */}
                    <div className="bg-white rounded p-4 mt-4 w-1/2">
                        <h2 className="text-lg font-semibold mb-2">
                            Created Courses
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Title
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Description
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Action
                                        </th>
                                        {/* Add more columns as needed */}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {mycourse.map((course, index) => (
                                        <tr
                                            key={index}
                                            className="bg-white p-4 my-4 rounded-md"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {course.title}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap"

dangerouslySetInnerHTML={{
    __html: truncateText(
        course.description,
        10
    ),
}}
/>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <a
                                                    href={route(
                                                        "course.edit",
                                                        course.id
                                                    )}
                                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                >
                                                    Read more
                                                    <svg
                                                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 14 10"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M1 5h12m0 0L9 1m4 4L9 9"
                                                        />
                                                    </svg>
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <a
                                                    href={route('lessons.create', { courseId: course.id })}
                                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                >
                                                    Create lesson
                                                    <svg
                                                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 14 10"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M1 5h12m0 0L9 1m4 4L9 9"
                                                        />
                                                    </svg>
                                                </a>
                                            </td>
                                            {/* Add more cells as needed */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
