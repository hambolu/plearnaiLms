<?php
namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Instructor;

class InstructorController extends Controller
{
    public function index()
    {
        $instructors = Instructor::all();
        return Inertia::render('Instructors/Index', ['instructors' => $instructors]);
    }

    public function create()
    {
        return Inertia::render('Instructors/Create');
    }

    public function store(Request $request)
    {
        // Add validation if necessary
        Instructor::create($request->all());
        return redirect()->route('instructors.index');
    }

    public function edit(Instructor $instructor)
    {
        return Inertia::render('Instructors/Edit', ['instructor' => $instructor]);
    }

    public function update(Request $request, Instructor $instructor)
    {
        // Add validation if necessary
        $instructor->update($request->all());
        return redirect()->route('instructors.index');
    }

    public function destroy(Instructor $instructor)
    {
        $instructor->delete();
        return redirect()->route('instructors.index');
    }
}
