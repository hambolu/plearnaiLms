import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "./Constants";
import { Button } from "flowbite-react";

const baseUrl = "http://localhost:8000/images/";
export default function CourseEdit({ auth, course }) {
    const [selectedImage, setSelectedImage] = useState("");
    const [formData, setFormData] = useState({
        title: course.title,
        description: course.description,
        category_id: course.category_id,
        duration: course.duration,
        level: course.level,
        prerequisites: course.prerequisites,
        startDate: course.startDate,
        endDate: course.endDate,
        image: course.image,
        price: course.price,
        discounts: course.discounts,
        visibility: "public",
        // Add other fields as needed
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleQuillChange = (field, value) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
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
                img.src = reader.result ? course.image : "";
            };
            reader.readAsDataURL(file);
        }
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

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(route("courses.update", course.id), formData);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Edit ${course.title}`} />

            <div className="py-1">
                <div className="max-w mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div class="max-w bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                {selectedImage && (
                                    <div>
                                        <p>Selected Image:</p>
                                        <img
                                            width=""
                                            className="rounded-t-lg"
                                            src={URL.createObjectURL(
                                                selectedImage
                                            )}
                                            alt={course.title}
                                        />
                                    </div>
                                )}
                                {!selectedImage && (
                                    <img
                                        className="w-full rounded-t-lg"
                                        src={`${baseUrl}${course.image}`}
                                        alt={course.title}
                                    />
                                )}

                                <form onSubmit={handleSubmit}>
                                    <h2 className="text-2xl font-semibold mb-4 p-2">
                                        {`Edit ${course.title}`}
                                    </h2>
                                    <div className=" rounded p-2">
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
                                    <div className="rounded p-2">
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
                                            Update Course
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
