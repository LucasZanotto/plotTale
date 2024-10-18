<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Author extends Authenticatable implements JWTSubject
{
    protected $fillable = [
        'name', 'email', 'password', 'about',
    ];

    protected $hidden = [
        'password',
    ];

    // Implementação das funções JWTSubject
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
