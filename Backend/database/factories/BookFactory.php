<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Author;

class BookFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = \App\Models\Book::class;

    /**
     * Define the model's default state.
     */
    public function definition()
    {
        return [
            'title'    => $this->faker->sentence(5),
            'user_id'  => Author::factory(), // Cria um Author automaticamente
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
