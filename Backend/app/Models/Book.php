<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Book extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'genre', 'user_id'];

    public function contents()
    {
        return $this->hasMany(Content::class);
    }

    public function author()
    {
        return $this->belongsTo(Author::class, 'user_id');
    }
}
