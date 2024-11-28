<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{

    public function index()
    {
        $books = Book::with('contents.author')->get();
        return response()->json($books);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'    => 'required|string|max:255',
            'user_id'  => 'required|exists:authors,id',
            'genre' => 'required|string|max:255',
        ]);

        $book = Book::create([
            'title' => $validated['title'],
            'user_id' => $validated['user_id'],
            'genre' => $validated['genre'],
        ]);

        return response()->json($book, 201);
    }

    public function show($id)
    {
        $book = Book::with('contents.author')->find($id);

        if (!$book) {
            return response()->json(['message' => 'Livro não encontrado'], 404);
        }

        return response()->json($book);
    }

    public function update(Request $request, $id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json(['message' => 'Livro não encontrado'], 404);
        }

        $validated = $request->validate([
            'title'    => 'sometimes|required|string|max:255',
            'user_id'  => 'sometimes|required|exists:authors,id|unique:authors',
            'genre' => 'sometimes|required|string|max:255',
        ]);

        $book->update($validated);

        return response()->json($book);
    }

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
        $books = Book::whereHas('contents', function ($query) use ($authorId) {
            $query->where('author_id', $authorId);
        })->get();

        return response()->json($books);
    }
}
