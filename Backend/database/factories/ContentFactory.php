<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Author;
use App\Models\Book;

class ContentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = \App\Models\Content::class;

    /**
     * Define the model's default state.
     */
    public function definition()
    {
        return [
            'content'    => $this->faker->paragraph(),
            'author_id'  => Author::factory(), // Cria um Author automaticamente
            'book_id'    => Book::factory(),   // Cria um Book automaticamente
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
