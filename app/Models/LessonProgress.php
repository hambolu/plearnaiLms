<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonProgress extends Model
{
    use HasFactory;

    protected $fillable = [
        'lesson_id',
        'course_id',
        'enrollment_id',
        'user_id',
        'status'
    ];

    

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function enrollments()
    {
        return $this->belongsTo(Enrollment::class);
    }
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function lesson() {
        return $this->belongsTo(Lesson::class);
    }
}
