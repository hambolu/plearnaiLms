<?php

namespace App\Http\Controllers\Course;

use Inertia\Inertia;
use App\Models\Lesson;
use Illuminate\Http\Request;
use App\Models\LessonProgress;
use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class LessonController extends Controller
{
    public function index()
    {
        $lessons = Lesson::all();
        return Inertia::render('Lessons/Index', ['lessons' => $lessons]);
    }

    public function create()
    {
        $route = Route::current();
        $courseId = $route->parameter('courseId');
        return Inertia::render('Lessons/LessonCreate', ['courseId' => $courseId]);
    }

    public function store(Request $request)
    {
        try {
            // Add validation if necessary

            $course_id = $request->course_id;
            $lessonsData = $request->lessons_data;
            foreach ($lessonsData as $item) {
                # code...
                Lesson::create([
                    'course_id' => $item['courseId'],
                    'title' => $item['title'],
                    'content' => $item['content'],
                    'assignment' =>$item['assignment'],
                    // Add other lesson fields here
                ]);
            }
            $courseId = Course::find($course_id);
            $courseUpdate = $courseId->update(['visibility' => 'public']);
            return response()->json([
                'status' => true,
                'message' => 'successfull'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function edit(Lesson $lesson)
    {
        return Inertia::render('Lessons/Edit', ['lesson' => $lesson]);
    }

    public function update(Request $request, Lesson $lesson)
    {
        // Add validation if necessary
        $lesson->update($request->all());
        return redirect()->route('lessons.index');
    }

    public function updateStatus(Request $request)
    {
        try {
            $checkLessonProgress = LessonProgress::where('course_id', $request->course_id)
            ->where('lesson_id', $request->lesson_id)
            ->where('enrollment_id', $request->enrollment_id)
            ->where('user_id', $request->user_id)
            ->first();
            if (!$checkLessonProgress) {
                
                LessonProgress::create([
                    'course_id' =>$request->course_id,
                    'lesson_id' =>$request->lesson_id,
                    'enrollment_id' =>$request->enrollment_id,
                    'user_id' => $request->user_id,
                    'status' => true
                ]);
                
            }
           
            return response()->json([
                'status' => true,
                'message' => 'successfull'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Lesson $lesson)
    {
        $lesson->delete();
        return redirect()->route('lessons.index');
    }
}
