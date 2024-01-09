<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $categories = [
            'Programming and Development',
            'Web Development',
            'Mobile App Development',
            'Data Science',
            'Artificial Intelligence',
            'Machine Learning',
            'Cybersecurity',
            'Cloud Computing',
            'Database Management',
            'Software Engineering',
            'UI/UX Design',
            'Graphic Design',
            'Digital Marketing',
            'Content Marketing',
            'Social Media Marketing',
            'Search Engine Optimization (SEO)',
            'Project Management',
            'Business Analytics',
            'Finance and Accounting',
            'Entrepreneurship',
            'Leadership and Management',
            'Personal Development',
            'Communication Skills',
            'Health and Wellness',
            'Yoga and Meditation',
            'Nutrition and Diet',
            'Language Learning',
            'Photography',
            'Music and Audio Production',
            'Game Development',
        ];

        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }
    }
}
