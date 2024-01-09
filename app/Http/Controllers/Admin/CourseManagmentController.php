<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;

class CourseManagmentController extends Controller
{
    public function index()
    {
        $courses = Course::all();
        return Inertia::render('CourseManagement/Index', ['courses' => $courses]);
    }

    public function create()
    {
        return Inertia::render('CourseManagement/Create');
    }

    public function store(Request $request)
    {
        // Add validation if necessary
        Course::create($request->all());
        return redirect()->route('course-management.index');
    }

    public function edit(Course $course)
    {
        return Inertia::render('CourseManagement/Edit', ['course' => $course]);
    }

    public function update(Request $request, Course $course)
    {
        // Add validation if necessary
        $course->update($request->all());
        return redirect()->route('course-management.index');
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return redirect()->route('course-management.index');
    }
}
