import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Profile" />

            <div className="py-1">
                <div className="flex max-w-7xl mx-auto sm:px-6 lg:px-3 space-y-6 pb-2 mb-8 bg-blue-800 rounded-md text-white">
                    <div className="pl-7 pt-10 items-center justify-center h-24 rounded  dark:bg-blue-800 shadow-sm">
                        <p className="flex text-2xl items-center justify-center">
                            <div className="relative">
                            <img className="w-20 h-20 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" width="84" height="84" src="https://img.icons8.com/arcade/64/guest-male.png" alt="guest-male"></img>
                            <span class="top-0 right-2 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                            </div>
                            <h4 className="ml-4 text-sm font-semibold items-center justify-center uppercase grid">{auth.user.name}
                            <span className="">StarScholars</span>
                            </h4>
                        </p>
                    </div>
                    
                </div>
                <div className="flex flex-col max-w-7xl mx-auto sm:px-6 lg:px-1 space-y-6 sm:flex-row sm:space-x-6">
    <div className="p-4 sm:p-8 w-full sm:w-1/3">
        <UpdateProfileInformationForm
            mustVerifyEmail={mustVerifyEmail}
            status={status}
            className="max-w-xl"
        />
    </div>

    <div className="p-4 sm:p-8 w-full sm:w-1/3">
        <UpdatePasswordForm className="max-w-xl" />
    </div>

    <div className="p-4 sm:p-8 w-full sm:w-1/3">
        <DeleteUserForm className="max-w-xl" />
    </div>
</div>

            </div>
        </AuthenticatedLayout>
    );
}
