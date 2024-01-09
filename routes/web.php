<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\Course\CourseController;
use App\Http\Controllers\Course\LessonController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Course\EnrollmentController;
use App\Http\Controllers\Instructor\InstructorController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CourseManagmentController;
use App\Http\Controllers\Admin\UserManagmentController;
use App\Http\Controllers\Category\CategoryController;
use App\Http\Controllers\Payment\PaymentController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.all');
Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('courses', [CourseController::class, 'index'])->name('course.index');
Route::get('courses/create', [CourseController::class, 'create'])->name('course.create');
Route::post('courses', [CourseController::class, 'store'])->name('course.store');
Route::get('courses/{course}', [CourseController::class, 'show'])->name('course.show');
Route::get('courses/{course}/edit', [CourseController::class, 'edit'])->name('course.edit');
Route::put('courses/{course}', [CourseController::class, 'update'])->name('course.update');
Route::delete('courses/{course}', [CourseController::class, 'destroy'])->name('course.destroy');

// Lessons
Route::get('lessons', [LessonController::class, 'index'])->name('lessons.index');
Route::get('/courses/{courseId}/lessons/create', [LessonController::class, 'create'])->name('lessons.create');
// ... similar routes for lessons

// Enrollments
Route::get('enrollments', [EnrollmentController::class, 'index'])->name('enrollments.index');
// ... similar routes for enrollments

// Instructors
Route::get('instructors', [InstructorController::class, 'index'])->name('instructors.index');
// ... similar routes for instructors

// User Management
Route::get('user-management', [UserManagmentController::class, 'index'])->name('user-management.index');
// ... similar routes for user management

// Course Management
Route::get('course-management', [CourseManagmentController::class, 'index'])->name('course-management.index');
// ... similar routes for course management

// Admins
Route::get('admins', [AdminController::class, 'index'])->name('admins.index');
// ... similar routes for admins
// Enrollments
Route::get('enrollments', [EnrollmentController::class, 'index'])->name('enrollments.index');
Route::get('enrollments/create', [EnrollmentController::class, 'create'])->name('enrollments.create');
Route::post('enrollments', [EnrollmentController::class, 'store'])->name('enrollments.store');
Route::get('enrollments/{enrollment_id}', [EnrollmentController::class, 'show'])->name('enrollments.show');
Route::get('enrollments/{enrollment}/edit', [EnrollmentController::class, 'edit'])->name('enrollments.edit');
Route::put('enrollments/{enrollment}', [EnrollmentController::class, 'update'])->name('enrollments.update');
Route::delete('enrollments/{enrollment}', [EnrollmentController::class, 'destroy'])->name('enrollments.destroy');

// Instructors
Route::get('instructors', [InstructorController::class, 'index'])->name('instructors.index');
Route::get('instructors/create', [InstructorController::class, 'create'])->name('instructors.create');
Route::post('instructors', [InstructorController::class, 'store'])->name('instructors.store');
Route::get('instructors/{instructor}', [InstructorController::class, 'show'])->name('instructors.show');
Route::get('instructors/{instructor}/edit', [InstructorController::class, 'edit'])->name('instructors.edit');
Route::put('instructors/{instructor}', [InstructorController::class, 'update'])->name('instructors.update');
Route::delete('instructors/{instructor}', [InstructorController::class, 'destroy'])->name('instructors.destroy');

// User Management
Route::get('user-management', [UserManagmentController::class, 'index'])->name('user-management.index');
// ... similar routes for user management

// Course Management
Route::get('course-management', [CourseManagmentController::class, 'index'])->name('course-management.index');
// ... similar routes for course management



//verify payment
Route::get('/success', [PaymentController::class, 'handleSuccess'])->name('success');
Route::get('/unsuccess', [PaymentController::class, 'handleSuccess'])->name('success');
// Admins
Route::get('admins', [AdminController::class, 'index'])->name('admins.index');
Route::get('admins/create', [AdminController::class, 'create'])->name('admins.create');
Route::post('admins', [AdminController::class, 'store'])->name('admins.store');
Route::get('admins/{admin}', [AdminController::class, 'show'])->name('admins.show');
Route::get('admins/{admin}/edit', [AdminController::class, 'edit'])->name('admins.edit');
Route::put('admins/{admin}', [AdminController::class, 'update'])->name('admins.update');
Route::delete('admins/{admin}', [AdminController::class, 'destroy'])->name('admins.destroy');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
