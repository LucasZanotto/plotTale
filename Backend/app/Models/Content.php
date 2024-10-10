<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Content extends Model
{
    use HasFactory;

    protected $fillable = ['content', 'author_id', 'book_id'];

    /**
     * Relação Many-to-One com Author.
     */
    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    /**
     * Relação Many-to-One com Book.
     */
    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
