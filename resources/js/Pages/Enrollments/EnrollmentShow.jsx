import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import DOMPurify from "dompurify";
import toast, { Toaster } from "react-hot-toast";

export default function EnrollmentShow({
    auth,
    enrollment,
    lessonProgress,
    lesson,
}) {
    //localStorage.clear();

    const [activeLesson, setActiveLesson] = useState(
        parseInt(localStorage.getItem("activeLesson")) || 0
    );

    useEffect(() => {
        const storedActiveLesson =
            parseInt(localStorage.getItem("activeLesson")) || 0;
        setActiveLesson(storedActiveLesson);
    }, []);
    useEffect(() => {
        localStorage.setItem("activeLesson", activeLesson.toString());
    }, [activeLesson]);

    const handleNextLesson = async () => {
        if (activeLesson < lesson.length - 1) {
            const currentLesson = lesson[activeLesson];

            const progressForCurrentLesson = lessonProgress.find(
                (progress) =>
                    progress.lesson_id === currentLesson.id &&
                    progress.user_id === auth.user.id
            );

            if (!progressForCurrentLesson) {
                try {
                    const response = await fetch(`/api/updateLesson`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            course_id: currentLesson.course_id,
                            lesson_id: currentLesson.id,
                            enrollment_id: enrollment.id,
                            user_id: auth.user.id,
                        }),
                    });

                    const data = await response.json();
                    //console.log(data);
                    if (data.message === "successfull") {
                        toast.success("Lesson Completed Successfully", {
                            position: "top-center",
                        });
                        setActiveLesson((prevLesson) => prevLesson + 1);
                    } else {
                        throw new Error(
                            toast.error("Failed to update lesson", {
                                position: "top-center",
                            })
                        );
                    }
                } catch (error) {
                    console.error(error);

                    toast.error("Failed to update lesson. Please try again", {
                        position: "top-center",
                    });
                }
            } else {
                setActiveLesson((prevLesson) => prevLesson + 1);
            }
        } else {
            try {
                // Mark the last lesson as completed (if not already completed)
                const lastLesson = lesson[activeLesson];
                const progressForCurrentLesson = lessonProgress.find(
                    (progress) =>
                        progress.lesson_id === lastLesson.id &&
                        progress.user_id === auth.user.id
                );

                if (!progressForCurrentLesson) {
                    const response = await fetch(`/api/updateLesson`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            course_id: lastLesson.course_id,
                            lesson_id: lastLesson.id,
                            enrollment_id: enrollment.id,
                            user_id: auth.user.id,
                        }),
                    });

                    const data = await response.json();
                    //console.log(data);

                    if (data.message === "successfull") {
                        toast.success("Course Completed Successfully", {
                            position: "top-center",
                        });
                        window.location.href = `/assignment/${lastLesson.id}`;
                    } else {
                        throw new Error(toast.error("Failed to update lesson. Please try again", {
                            position: "top-center",
                        }));
                    }
                }else{
                    window.location.href = `/assignment/${lastLesson.id}`;
                }

                
            } catch (error) {
                //console.error(error);

                toast.error("Failed to update lesson. Please try again", {
                    position: "top-center",
                });
            }
        }
    };

    const handlePreviousLesson = () => {
        if (activeLesson > 0) {
            setActiveLesson((prevLesson) => prevLesson - 1);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Enrollments" />
            <div className="py-1">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-2">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex flex-wrap">
                            {/* First Column */}
                            <div className="w-auto sm:w-auto p-2 ">
                                <div
                                    key={enrollment.id}
                                    className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4"
                                >
                                    <div className="flex flex-wrap flex-col justify-between p-6 leading-normal ">
                                        <h2 className="text-2xl font-normal text-white mb-8 mt-8 bg-blue-800 p-10 rounded">
                                            {enrollment.course.title}
                                        </h2>
                                        <h3 className="text-xl font-normal text-white mb-4">
                                            Course Description
                                        </h3>
                                        <div
                                            className="prose max-w-full pl-10"
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(
                                                    enrollment.course
                                                        .description
                                                ),
                                            }}
                                        />
                                    </div>
                                    <div className="p-6 bg-white border-b border-gray-200">
                                        <div key={enrollment.id}>
                                            <h2>Course Lessons</h2>
                                            {lesson.map((lessonItem, index) => (
                                                <div key={lessonItem.id}>
                                                    {activeLesson === index && (
                                                        <div>
                                                            <div>
                                                                <h2 className="mb-2">
                                                                    Lesson{" "}
                                                                    {
                                                                        lessonItem.id
                                                                    }
                                                                    :{" "}
                                                                    {
                                                                        lessonItem.title
                                                                    }
                                                                </h2>
                                                            </div>
                                                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                                                Lesson Content:{" "}
                                                                {
                                                                    lessonItem.content
                                                                }
                                                            </p>
                                                            <div>
                                                                <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                                                                    <iframe
                                                                        width="100%"
                                                                        height="500"
                                                                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                                                                            lessonItem.video_url
                                                                        )}`}
                                                                        title={
                                                                            lessonItem.title
                                                                        }
                                                                        frameBorder="0"
                                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                        allowFullScreen
                                                                    ></iframe>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        {activeLesson > 0 && (
                                            <button
                                                onClick={handlePreviousLesson}
                                                className="focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                                            >
                                                Previous Lesson
                                            </button>
                                        )}
                                        {}
                                        <button
                                            onClick={handleNextLesson}
                                            className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            {activeLesson < lesson.length - 1
                                                ? "Next Lesson"
                                                : "Complete Course"}
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap">
    {lesson.map((lessonItem, index) => (
        <div
            key={lessonItem.id}
            className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 ${
                activeLesson === index ? 'bg-blue-800' : 'bg-white'
            } border border-gray-300 rounded-md shadow-md mb-4`}
        >
            <h2 className={`text-xl font-semibold mb-2 ${activeLesson === index ? 'text-white' : 'text-gray-800'}`}>
                {`Lesson ${lessonItem.id}`}
            </h2>
            <p className={`${activeLesson === index ? 'text-white' : 'text-gray-600'}`}>
                {lessonItem.title}
            </p>
        </div>
    ))}
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

function getYouTubeVideoId(url) {
    const match = url.match(
        /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
}

const isPreviousLessonCompleted = (lessonProgress) => {
    return lessonProgress.status === 1;
};
