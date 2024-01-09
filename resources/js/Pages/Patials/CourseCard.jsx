// CourseCard.js
import React from "react";
import ProgressBar from "../Patials/ProgressBar";

const CourseCard = ({ title, description,enrollmentItem }) => {
    const truncateText = (text, maxLength) => {
        return text.length > maxLength
            ? text.slice(0, maxLength) + "..."
            : text;
    };
    return (
        <div className="h-50 bg-blue-900 dark:bg-gray-800 p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <div
                className="text-sm mb-3 font-normal text-white dark:text-white"
                dangerouslySetInnerHTML={{
                    __html: truncateText(description, 50),
                }}
            />
            <ProgressBar enrollmentItem={enrollmentItem} />
            <p className="text-gray-600 dark:text-gray-400 mt-2"></p>
            {/* Add more details or actions as needed */}
        </div>
    );
};

export default CourseCard;
