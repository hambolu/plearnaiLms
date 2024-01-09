import React from "react";

const ProgressBar = ({ enrollmentItem }) => {
    const lessons = enrollmentItem.course.lessons || [];
    const lessonProgress = enrollmentItem.course.lessons.lesson_progress || [];
    const totalLessons = lessons.length || 0;
    const completedLessons = lessons.filter(
        (lesson) =>
            lesson.lesson_progress &&
            lesson.lesson_progress.length > 0 &&
            lesson.lesson_progress.every((progress) => progress.status)
    ).length;

    const progress =
        totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    //console.log(lessons);

    return (
        <div className="relative pt-1">
  <div className="flex mb-2 items-center justify-between">
    <div>
      {progress === 100 ? (
        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-blue-500">
          Completed
        </span>
      ) : (
        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-blue-500">
          In Progress
        </span>
      )}
    </div>
    <div className=" bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className="bg-blue-800 h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    <div className="text-right">
      <span className="text-xs font-semibold inline-block text-white">
        {progress}%
      </span>
    </div>
  </div>
  
  <div className="flex">
    <div className="flex items-center justify-start text-white w-full">
      <div className="rounded-full overflow-hidden h-2 mb-4 w-full bg-gray-300">
        <div
          style={{ width: `${progress}%` }}
          className="rounded-full shadow-none h-2 bg-blue-500"
        ></div>
      </div>
    </div>
  </div>
</div>

    );
};

export default ProgressBar;
