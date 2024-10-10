<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    use HasFactory;

    protected $fillable = ['content', 'author_id', 'book_id', 'stage', 'is_approve'];

    // Relacionamento com o livro
    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    // Relacionamento com o autor
    public function author()
    {
        return $this->belongsTo(Author::class);
    }
}
