<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'slug',
        'course_token',
        'user_id',
        'category_id',
        'duration',
        'level',
        'instructor',
        'prerequisites',
        'start_date',
        'end_date',
        'image',
        'price',
        'discounts',
        'visibility',
    ];

    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function instructor()
    {
        return $this->belongsTo(Instructor::class);
    }
}
