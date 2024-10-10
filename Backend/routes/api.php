<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthorController;

// Rotas protegidas por autenticação para criação e adição de conteúdo
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/profile', [AuthorController::class, 'profile']); // Exibe o perfil do usuário logado
});

// Rotas para gerenciamento de autores (register/login seriam em outro lugar)
Route::post('/authors', [AuthorController::class, 'store']); // Cria um novo autor
