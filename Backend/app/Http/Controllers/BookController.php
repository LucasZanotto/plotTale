<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Exibir uma lista de livros.
     */
    public function index()
    {
        $books = Book::with('contents.author')->get();
        return response()->json($books);
    }

    /**
     * Armazenar um novo livro.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'    => 'required|string|max:255',
            'user_id'  => 'required|exists:authors,id',
        ]);

        $book = Book::create($validated);

        return response()->json($book, 201);
    }

    /**
     * Exibir um livro específico com seus conteúdos.
     */
    public function show($id)
    {
        $book = Book::with('contents.author')->find($id);

        if (!$book) {
            return response()->json(['message' => 'Livro não encontrado'], 404);
        }

        return response()->json($book);
    }

    /**
     * Atualizar um livro específico.
     */
    public function update(Request $request, $id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json(['message' => 'Livro não encontrado'], 404);
        }

        $validated = $request->validate([
            'title'    => 'sometimes|required|string|max:255',
            'user_id'  => 'sometimes|required|exists:authors,id',
        ]);

        $book->update($validated);

        return response()->json($book);
    }

    /**
     * Remover um livro específico.
     */
    public function destroy($id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json(['message' => 'Livro não encontrado'], 404);
        }

        $book->delete();

        return response()->json(['message' => 'Livro deletado com sucesso']);
    }

    public function booksByAuthor($authorId)
{
    // Busca todos os conteúdos do autor e carrega os livros relacionados
    $books = Book::whereHas('contents', function ($query) use ($authorId) {
        $query->where('author_id', $authorId);
    })->get();

    return response()->json($books);
}
}
