<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'video_url',
        'course_id',
        'status',
        'assignment',
        // Make sure 'course_id' is in the fillable array
    ];
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
    public function lesson_progress()
    {
        return $this->hasMany(LessonProgress::class);
    }

}
