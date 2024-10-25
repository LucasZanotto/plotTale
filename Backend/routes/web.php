<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('login', [AuthController::class, 'login']);
Route::get('logout', [AuthController::class, 'logout'])->name('logout');

// Protege as rotas com um middleware customizado
Route::middleware('checkAuthor')->group(function () {
    Route::get('/', function () {
        return view('home'); // Página inicial protegida
    })->name('home');
});
