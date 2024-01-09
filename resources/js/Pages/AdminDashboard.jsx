import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Cards from "./Patials/Cards";

export default function Dashboard({ auth }) {
    //const roles = auth.user ? auth.user.roles : [];
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-1">
                
            <div className="p-2 rounded-lg dark:border-gray-700">
                <Cards/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
