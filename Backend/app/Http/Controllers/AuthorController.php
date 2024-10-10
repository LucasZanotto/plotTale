<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthorController extends Controller
{
    // Cria um novo autor
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:authors',
            'password' => 'required|string|min:6',
        ]);

        $author = Author::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);

        return response()->json($author, 201);
    }

    // Exibe o perfil do autor logado
    public function profile()
    {
        $author = Auth::user();
        $contributedBooks = $author->booksContributed()->get();

        return response()->json([
            'user' => $author,
            'contributedBooks' => $contributedBooks
        ]);
    }
}
