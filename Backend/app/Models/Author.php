<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Author extends Authenticatable
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'password', 'about'];

    /**
     * Relação One-to-Many com Content.
     */
    public function contents()
    {
        return $this->hasMany(Content::class);
    }

    /**
     * Relação One-to-Many com Book.
     */
    public function books()
    {
        return $this->hasMany(Book::class, 'user_id');
    }
}
