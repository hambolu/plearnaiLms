import React from 'react';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

// Inside your component
const SideBar = ({user}) => {

    const { pathname } = useLocation();
    
    const getActiveLink = (link) => {
        const isActive = pathname === link || pathname.startsWith(link);
        return `flex items-center p-2 ${isActive ? 'text-white bg-blue-500' : 'text-blue-500 hover:text-blue-800'} rounded-lg dark:text-white group`;
    };
    
    return (
        <div>
            <aside
                id="sidebar-multi-level-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800 ">
                {(user.role === 'user')&& (
                    <ul className="space-y-2 font-medium">
                        <li className={getActiveLink('/dashboard')}>
                            <a
                                href={route("dashboard")}
                                className={`flex items-center p-2 ${getActiveLink('/dashboard')} text-blue-800 rounded-lg dark:text-blue-800 hover:text-blue-800  dark: group`}>
                                <svg
                                    className="w-5 h-5 text-blue-800 transition duration-75 hover:text-blue-800 dark:text-gray-400 group-hover:text-blue-800 dark:group-hover:text-blue-800"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                >
                                    <path  d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Dashboard </span>
                            </a>
                        </li>
                        
                        <li className={getActiveLink('/profile')}>
                            <a
                                href={route("profile.edit")}
                                className="flex items-center p-2 text-blue-800 rounded-lg dark:text-blue-800 hover:text-blue-800  dark: group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-blue-800 transition duration-75 dark:text-gray-400 group-hover:text-blue-800 dark:group-hover:text-blue-800"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 18"
                                >
                                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Profile
                                </span>
                            </a>
                        </li>
                        <li className={getActiveLink('/course')}>
                            <a
                                href={route("course.index")}
                                className="flex items-center p-2 text-blue-800 rounded-lg dark:text-blue-800 hover:text-blue-800  dark: group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-blue-800 transition duration-75 dark:text-gray-400 group-hover:text-blue-800 dark:group-hover:text-blue-800"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 18 20"
                                >
                                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Library
                                </span>
                            </a>
                        </li>
                        <li className={getActiveLink('/enrollments')}>
                            <a
                                href={route("enrollments.index")}
                                className="flex items-center p-2 text-blue-800 rounded-lg dark:text-blue-800 hover:text-blue-800  dark: group"
                            >
                                <svg
                                    className="w-[15px] h-[15px] text-blue-800 dark:text-blue-800"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 18"
                                >
                                    <path d="M9 1.334C7.06.594 1.646-.84.293.653a1.158 1.158 0 0 0-.293.77v13.973c0 .193.046.383.134.55.088.167.214.306.366.403a.932.932 0 0 0 .5.147c.176 0 .348-.05.5-.147 1.059-.32 6.265.851 7.5 1.65V1.334ZM19.707.653C18.353-.84 12.94.593 11 1.333V18c1.234-.799 6.436-1.968 7.5-1.65a.931.931 0 0 0 .5.147.931.931 0 0 0 .5-.148c.152-.096.279-.235.366-.403.088-.167.134-.357.134-.55V1.423a1.158 1.158 0 0 0-.293-.77Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    My Courses
                                </span>
                            </a>
                        </li>
                        <li className={getActiveLink('/course')}>
                            <a
                                href={route("course.index")}
                                className="flex items-center p-2 text-blue-800 rounded-lg dark:text-blue-800 hover:text-blue-800  dark: group"
                            >
                                <svg
                                    className="w-[15px] h-[15px] text-blue-800 dark:text-blue-800"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 18"
                                >
                                    <path d="M9 1.334C7.06.594 1.646-.84.293.653a1.158 1.158 0 0 0-.293.77v13.973c0 .193.046.383.134.55.088.167.214.306.366.403a.932.932 0 0 0 .5.147c.176 0 .348-.05.5-.147 1.059-.32 6.265.851 7.5 1.65V1.334ZM19.707.653C18.353-.84 12.94.593 11 1.333V18c1.234-.799 6.436-1.968 7.5-1.65a.931.931 0 0 0 .5.147.931.931 0 0 0 .5-.148c.152-.096.279-.235.366-.403.088-.167.134-.357.134-.55V1.423a1.158 1.158 0 0 0-.293-.77Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    My Projects
                                </span>
                            </a>
                        </li>
                        <li className={getActiveLink('/course')}>
                            <a
                                href={route("course.index")}
                                className="flex items-center p-2 text-blue-800 rounded-lg dark:text-blue-800 hover:text-blue-800  dark: group"
                            >
                                <svg
                                    className="w-[15px] h-[15px] text-blue-800 dark:text-blue-800"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 18"
                                >
                                    <path d="M9 1.334C7.06.594 1.646-.84.293.653a1.158 1.158 0 0 0-.293.77v13.973c0 .193.046.383.134.55.088.167.214.306.366.403a.932.932 0 0 0 .5.147c.176 0 .348-.05.5-.147 1.059-.32 6.265.851 7.5 1.65V1.334ZM19.707.653C18.353-.84 12.94.593 11 1.333V18c1.234-.799 6.436-1.968 7.5-1.65a.931.931 0 0 0 .5.147.931.931 0 0 0 .5-.148c.152-.096.279-.235.366-.403.088-.167.134-.357.134-.55V1.423a1.158 1.158 0 0 0-.293-.77Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Uvideo
                                </span>
                            </a>
                        </li>
                        
                        
                        <li className={getActiveLink('/course')}>
                            <a
                                href={route("course.index")}
                                className="flex items-center p-2 text-blue-800 rounded-lg dark:text-blue-800 hover:text-blue-800  dark: group"
                            >
                                <svg
                                    className="w-[15px] h-[15px] text-blue-800 dark:text-blue-800"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 18"
                                >
                                    <path d="M9 1.334C7.06.594 1.646-.84.293.653a1.158 1.158 0 0 0-.293.77v13.973c0 .193.046.383.134.55.088.167.214.306.366.403a.932.932 0 0 0 .5.147c.176 0 .348-.05.5-.147 1.059-.32 6.265.851 7.5 1.65V1.334ZM19.707.653C18.353-.84 12.94.593 11 1.333V18c1.234-.799 6.436-1.968 7.5-1.65a.931.931 0 0 0 .5.147.931.931 0 0 0 .5-.148c.152-.096.279-.235.366-.403.088-.167.134-.357.134-.55V1.423a1.158 1.158 0 0 0-.293-.77Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Team
                                </span>
                            </a>
                        </li>
                        <li className={getActiveLink('/course')}>
                            <a
                                href={route("course.index")}
                                className="flex items-center p-2 text-blue-800 rounded-lg dark:text-blue-800 hover:text-blue-800  dark: group"
                            >
                                <svg
                                    className="w-[15px] h-[15px] text-blue-800 dark:text-blue-800"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 18"
                                >
                                    <path d="M9 1.334C7.06.594 1.646-.84.293.653a1.158 1.158 0 0 0-.293.77v13.973c0 .193.046.383.134.55.088.167.214.306.366.403a.932.932 0 0 0 .5.147c.176 0 .348-.05.5-.147 1.059-.32 6.265.851 7.5 1.65V1.334ZM19.707.653C18.353-.84 12.94.593 11 1.333V18c1.234-.799 6.436-1.968 7.5-1.65a.931.931 0 0 0 .5.147.931.931 0 0 0 .5-.148c.152-.096.279-.235.366-.403.088-.167.134-.357.134-.55V1.423a1.158 1.158 0 0 0-.293-.77Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Settings
                                </span>
                            </a>
                        </li>
                    </ul>
                )}
                    {(user.role === 'instructor')&& (
                         <ul className="space-y-2 font-medium">
                         <li className={getActiveLink('/dashboard')}>
                             <a
                                 href={route("dashboard")}
                                 className="flex items-center p-2 text-blue-800 rounded-lg dark:text-blue-800 hover:text-blue-800  dark: group">
                                 <svg
                                     className="w-5 h-5 text-blue-800 transition duration-75 hover:text-blue-800 dark:text-gray-400 group-hover:text-blue-800 dark:group-hover:text-blue-800"
                                     aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor"
                                     viewBox="0 0 22 21"
                                 >
                                     <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                     <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                 </svg>
                                 <span className="ms-3">Dashboard</span>
                             </a>
                         </li>
                         
                         <li className={getActiveLink('/profile')}>
                             <a
                                 href={route("profile.edit")}
                                 className="flex items-center p-2 text-blue-800 rounded-lg dark:text-blue-800 hover:text-blue-800  dark: group"
                             >
                                 <svg
                                     className="flex-shrink-0 w-5 h-5 text-blue-800 transition duration-75 dark:text-gray-400 group-hover:text-blue-800 dark:group-hover:text-blue-800"
                                     aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor"
                                     viewBox="0 0 20 18"
                                 >
                                     <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                 </svg>
                                 <span className="flex-1 ms-3 whitespace-nowrap">
                                     Profile
                                 </span>
                             </a>
                         </li>
                         <li className={getActiveLink('/courses/create')}>
                             <a
                                 href={route("course.create")}
                                 className="flex items-center p-2 text-blue-800 rounded-lg dark:text-blue-800 hover:text-blue-800  dark: group"
                             >
                                 <svg
                                     className="flex-shrink-0 w-5 h-5 text-blue-800 transition duration-75 dark:text-gray-400 group-hover:text-blue-800 dark:group-hover:text-blue-800"
                                     aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor"
                                     viewBox="0 0 18 20"
                                 >
                                     <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                 </svg>
                                 <span className="flex-1 ms-3 whitespace-nowrap">
                                     Create Courses
                                 </span>
                             </a>
                         </li>
                         <li className={getActiveLink('/enrollments')}>
                             <a
                                 href={route("enrollments.index")}
                                 className="flex items-center p-2 text-blue-800 rounded-lg dark:text-blue-800 hover:text-blue-800  dark: group"
                             >
                                 <svg
                                     className="w-[15px] h-[15px] text-blue-800 dark:text-blue-800"
                                     aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor"
                                     viewBox="0 0 20 18"
                                 >
                                     <path d="M9 1.334C7.06.594 1.646-.84.293.653a1.158 1.158 0 0 0-.293.77v13.973c0 .193.046.383.134.55.088.167.214.306.366.403a.932.932 0 0 0 .5.147c.176 0 .348-.05.5-.147 1.059-.32 6.265.851 7.5 1.65V1.334ZM19.707.653C18.353-.84 12.94.593 11 1.333V18c1.234-.799 6.436-1.968 7.5-1.65a.931.931 0 0 0 .5.147.931.931 0 0 0 .5-.148c.152-.096.279-.235.366-.403.088-.167.134-.357.134-.55V1.423a1.158 1.158 0 0 0-.293-.77Z" />
                                 </svg>
                                 <span className="flex-1 ms-3 whitespace-nowrap">
                                     Enrollments 
                                 </span>
                             </a>
                         </li>
                         <li className={getActiveLink('/course')}>
                             <a
                                 href={route("course.index")}
                                 className="flex items-center p-2 text-blue-800 rounded-lg dark:text-blue-800 hover:text-blue-800  dark: group"
                             >
                                 <svg
                                     className="w-[15px] h-[15px] text-blue-800 dark:text-blue-800"
                                     aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor"
                                     viewBox="0 0 20 18"
                                 >
                                     <path d="M9 1.334C7.06.594 1.646-.84.293.653a1.158 1.158 0 0 0-.293.77v13.973c0 .193.046.383.134.55.088.167.214.306.366.403a.932.932 0 0 0 .5.147c.176 0 .348-.05.5-.147 1.059-.32 6.265.851 7.5 1.65V1.334ZM19.707.653C18.353-.84 12.94.593 11 1.333V18c1.234-.799 6.436-1.968 7.5-1.65a.931.931 0 0 0 .5.147.931.931 0 0 0 .5-.148c.152-.096.279-.235.366-.403.088-.167.134-.357.134-.55V1.423a1.158 1.158 0 0 0-.293-.77Z" />
                                 </svg>
                                 <span className="flex-1 ms-3 whitespace-nowrap">
                                     U-gain
                                 </span>
                             </a>
                         </li>
                         
                     </ul>
                    )}
                </div>
            </aside>
        </div>
    );
}

export default SideBar;

