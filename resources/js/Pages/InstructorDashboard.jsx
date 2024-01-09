import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import InstructorCard from "./Patials/InstructorCard";

export default function Dashboard({ auth,course }) {
    //const roles = auth.user ? auth.user.roles : [];
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-1">
                
            <div className="p-2 rounded-lg dark:border-gray-700">
                <InstructorCard auth={auth}  course={course} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
