<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $text = 'role text';
        $user = auth()->user();

        $enrollment = Enrollment::with('course.lessons.lesson_progress')->where('user_id',Auth::id())->get();

        $course = Course::where('user_id',Auth::id())->get();
        $allCourse = Auth::user()->role === 'admin' ? Course::all() : [];
        if(Auth::user()->role === 'instructor')
        {
        //     dd($enrollment,
        //     $course,
        //    $allCourse);
            return Inertia::render('InstructorDashboard', 
            [
                'enrollment' => $enrollment,
                'course' => $course,
                'allCourse' => $allCourse
            ]);

        }

        

        if(Auth::user()->role === 'admin')
        {
            return Inertia::render('AdminDashboard', [
                'enrollment' => $enrollment,
                'course' => $course,
                'allCourse' => $allCourse
            ]);

        }

        return Inertia::render('Dashboard', [
            'enrollment' => $enrollment,
            'course' => $course,
            'allCourse' => $allCourse
        ]);


    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
