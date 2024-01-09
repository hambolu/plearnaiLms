import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "flowbite-react";

export default function LessonCreate({ auth, courseId }) {
    const [lessons, setLessons] = useState([
        { title: "", content: "", video_url: "", assignment: "" },
    ]);

    const handleChange = (index, field, value) => {
        const updatedLessons = [...lessons];
        updatedLessons[index][field] = value;
        setLessons(updatedLessons);
    };

    const addLesson = () => {
        setLessons([
            ...lessons,
            { title: "", content: "", video_url: "", assignment: "" },
        ]);
    };

    const removeLesson = (index) => {
        const updatedLessons = [...lessons];
        updatedLessons.splice(index, 1);
        setLessons(updatedLessons);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const lessonsData = lessons.map((lesson) => ({
                courseId: courseId,
                title: lesson.title,
                content: lesson.content,
                video_url: lesson.video_url,
                assignment: lesson.assignment,
                // Add other lesson fields here
            }));
            const response = await axios.post("/api/lessons/create", {
                lessons_data: lessonsData,
            });

            //console.log(response.data);
            if (response.data.message === "successfull") {
                alert("Lessons created successfully!");
                window.location.href = `/courses/${courseId}`;
            } else {
                alert("Failed to create lessons. Please try again.");
            }
            //console.log(lessonsData,courseId);
        } catch (error) {
            console.error("Error creating lessons:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Lessons" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-2xl font-semibold mb-2">
                                Create Lessons
                            </h2>
                            <form onSubmit={handleSubmit}>
                                {lessons.map((lesson, index) => (
                                    <div key={index} className="mb-4">
                                        <label className="block text-sm font-medium text-gray-600">
                                            Lesson Title
                                        </label>
                                        <input
                                            type="text"
                                            value={lesson.title}
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "title",
                                                    e.target.value
                                                )
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />

                                        <label className="block text-sm font-medium text-gray-600 mt-2">
                                            Lesson Content
                                        </label>
                                        <textarea
                                            value={lesson.content}
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "content",
                                                    e.target.value
                                                )
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-32"
                                        />
                                        <label className="block text-sm font-medium text-gray-600">
                                            Media Url(video)
                                        </label>
                                        <input
                                            type="text"
                                            value={lesson.video_url}
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "video_url",
                                                    e.target.value
                                                )
                                            }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />

                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeLesson(index)
                                                }
                                                className="text-sm text-red-500 mt-2"
                                            >
                                                Remove Lesson
                                            </button>
                                        )}

                                        <hr className="my-4" />
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addLesson}
                                    className="text-sm text-green-500 mb-4"
                                >
                                    + Add Lesson
                                </button>

                                <div className="mb-2">
                                    <Button
                                        type="submit"
                                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                    >
                                        Create Lessons
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
