<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->string('duration')->nullable();
            $table->string('level')->nullable();
            $table->text('prerequisites');
            $table->string('enrollment_key')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('featured_image')->nullable();
            $table->text('outline')->nullable();
            $table->text('materials')->nullable();
            $table->string('tags')->nullable();
            $table->decimal('price', 8, 2)->nullable();
            $table->string('discounts')->nullable();
            $table->string('visibility')->default('public');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            //
        });
    }
};
