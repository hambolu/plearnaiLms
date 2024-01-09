import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Cards from "./Patials/Cards";
import CourseCard from "./Patials/CourseCard";
import Slider from "react-slick";

export default function Dashboard({ auth, enrollment, course, allCourse }) {
    
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-1">
                <div className="p-4 rounded-lg dark:border-gray-700">
                    <div className="flex flex-wrap gap-2">
                        {enrollment.map((enrollmentItem) => (
                            <div key={enrollmentItem.id} className="p-1">
                                {enrollmentItem.course && ( // Check if enrollmentItem.course is defined
                                    <CourseCard
                                        title={enrollmentItem.course.title}
                                        description={
                                            enrollmentItem.course.description
                                        }
                                        enrollmentItem={enrollmentItem}
                                    />
                                )}
                            </div>
                        ))}
                        <div className="h-50 bg-blue-900 dark:bg-gray-800 p-6 rounded-md shadow-md flex items-center">
                            <h3 className="text-lg font-semibold text-white">
                                +{" "}
                            </h3>

                            <a
                                href={route("course.index")}
                                className="flex items-center text-white"
                            >
                                 &nbsp;Add Course
                            </a>
                        </div>
                    </div>
                    <Cards auth={auth} enrollment={enrollment}  course={course} allCourse={allCourse}  />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
