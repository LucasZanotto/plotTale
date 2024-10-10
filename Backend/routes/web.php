<?php

use App\Http\Controllers\AuthorController;

// Authors (Register/Login)
Route::get('/register', [AuthorController::class, 'create']);
Route::post('/register', [AuthorController::class, 'store']);
Route::get('/login', [AuthorController::class, 'login']);
Route::post('/login', [AuthorController::class, 'authenticate']);
Route::get("/home", function(){
    $objeto = [
        "nome" => "Lucas",
        "idade" => 20
    ];
    return $objeto;
});

