<?php

namespace App\Http\Controllers\Course;

use Inertia\Inertia;
use App\Models\Course;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        $courses = Course::orderBy('created_at', 'desc')->with(['category', 'lessons'])
        ->where('visibility', 'public')    
        ->paginate(50);
        return Inertia::render('Course/Index', [
            'courses' => $courses,
            'categories' => $categories
        ]);
    }

    public function create()
    {
        $mycourse = Course::where('user_id',Auth::id())
        ->get();
        return Inertia::render('Course/Create', ['mycourse' => $mycourse]);
    }

    public function createUniqueSlug($title)
    {
        // Generate a slug from the title
        $slug = Str::slug($title);

        // Check if the generated slug already exists in the database
        $count = Course::where('slug', $slug)->count();

        // If the slug already exists, append a number to make it unique
        while ($count > 0) {
            $slug = Str::slug($title) . '-' . $count;
            $count = Course::where('slug', $slug)->count();
        }

        // Now, $slug is a unique slug for the given title
        return $slug;
    }

    public function store(Request $request)
    {
        //dd($request->all());
        // Add validation if necessary
        try {
            $request->validate([
                'title' => 'required|string',
                'description' => 'required|string',
                'category_id' => 'required', // Add validation for other fields as needed
                'duration' => 'required',
                'level' => 'required',
                'instructor' => 'required',
                'prerequisites' => 'required',
                'startDate' => 'required|date',
                'endDate' => 'required|date',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'price' => 'required|numeric',
                'discounts' => 'required|numeric',
                'visibility' => 'required|string',
            ]);

            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);

            $title = $request->title;
            $slug = $this->createUniqueSlug($title);
            $uuid = Str::uuid();
            $course = Course::create([
                'title' => $request->title,
                'description' => $request->description,
                'slug' => $slug,
                'course_token' => $uuid,
                'user_id' => $request->user_id,
                'category_id' => $request->category_id,
                'duration' => $request->duration,
                'level' => $request->level,
                'instructor' => $request->instructor,
                'prerequisites' => $request->prerequisites,
                'start_date' => $request->startDate,
                'end_date' => $request->endDate,
                'image' => $imageName,
                'price' => $request->price,
                'discounts' => $request->discounts,
                'visibility' => $request->visibility,
            ]);

            //dd($course);
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

    public function show(Course $course)
    {
        return Inertia::render('Course/Show', ['course' => $course]);
    }

    public function edit(Course $course)
    {
        return Inertia::render('Course/Edit', ['course' => $course]);
    }

    public function update(Request $request, Course $course)
    {
        // Add validation if necessary
        $course->update($request->all());
        return redirect()->route('course.index');
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return redirect()->route('course.index');
    }
}
