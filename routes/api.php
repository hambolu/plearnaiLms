<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Course\CourseController;
use App\Http\Controllers\Course\LessonController;
use App\Http\Controllers\Payment\PaymentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('courses/create', [CourseController::class, 'store'])->name('course.store');
Route::post('payment/create', [PaymentController::class, 'store'])->name('payment.store');
Route::post('lessons/create', [LessonController::class, 'store'])->name('lessons.store');
Route::post('updateLesson', [LessonController::class, 'updateStatus'])->name('updateLesson');