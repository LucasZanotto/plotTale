<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Book extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'genre', 'user_id'];

    /**
     * Relação One-to-Many com Content.
     */
    public function contents()
    {
        return $this->hasMany(Content::class);
    }

    /**
     * Relação Many-to-One com Author.
     */
    public function author()
    {
        return $this->belongsTo(Author::class, 'user_id');
    }
}
