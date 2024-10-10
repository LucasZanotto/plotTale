<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Author extends Authenticatable
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'password', 'about'];

    // Relacionamento com os livros onde o autor contribuiu
    public function booksContributed()
    {
        return $this->hasManyThrough(Book::class, Content::class);
    }
}
