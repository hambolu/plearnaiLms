<?php
namespace App\Http\Controllers\Course;

use Inertia\Inertia;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\LessonProgress;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class EnrollmentController extends Controller
{
    public function index()
    {
        $enrollments = Enrollment::with('course')->where('user_id',Auth::id())->get();
        
        return Inertia::render('Enrollments/EnrollmentIndex', ['enrollments' => $enrollments]);
    }

    public function create()
    {
        return Inertia::render('Enrollments/Create');
    }

    public function store(Request $request)
    {
        // Add validation if necessary
        Enrollment::create($request->all());
        return redirect()->route('enrollments.index');
    }

    public function show($enrollment_id)
    {
        // $route = Route::current();
        // $id = $route->parameter('enrollment_id');
        $enrollment = Enrollment::with('course.lessons')
        ->where('user_id',Auth::id())
        ->where('course_id',$enrollment_id)
        ->first();
        $lesson = Lesson::where('course_id', $enrollment_id)->get();
        $lessonProress = LessonProgress::with(['course','lesson','enrollments'])
        ->where('user_id',Auth::id())
        ->where('course_id',$enrollment_id)
        ->get();
        //dd($enrollment, $lessonProress);
        return Inertia::render('Enrollments/EnrollmentShow', [
            'enrollment' => $enrollment,
            'lessonProgress' => $lessonProress,
            'lesson' => $lesson

    ]);
    }

    public function edit(Enrollment $enrollment)
    {
        return Inertia::render('Enrollments/Edit', ['enrollment' => $enrollment]);
    }

    public function update(Request $request, Enrollment $enrollment)
    {
        // Add validation if necessary
        $enrollment->update($request->all());
        return redirect()->route('enrollments.index');
    }

    public function destroy(Enrollment $enrollment)
    {
        $enrollment->delete();
        return redirect()->route('enrollments.index');
    }
}
