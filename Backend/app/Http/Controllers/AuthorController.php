<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AuthorController extends Controller
{
    /**
     * Exibir uma lista de autores.
     */
    public function index()
    {
        $authors = Author::all();
        return response()->json($authors);
    }

    /**
     * Armazenar um novo autor.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:authors',
            'password' => 'required|string|min:6',
            'about'    => 'nullable|string',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $author = Author::create($validated);

        return response()->json($author, 201);
    }

    /**
     * Exibir um autor específico.
     */
    public function show($id)
    {
        $author = Author::find($id);

        if (!$author) {
            return response()->json(['message' => 'Autor não encontrado'], 404);
        }

        return response()->json($author);
    }

    /**
     * Atualizar um autor específico.
     */
    public function update(Request $request, $id)
    {
        $author = Author::find($id);

        if (!$author) {
            return response()->json(['message' => 'Autor não encontrado'], 404);
        }

        $validated = $request->validate([
            'name'     => 'sometimes|required|string|max:255',
            'email'    => [
                'sometimes',
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('authors')->ignore($author->id),
            ],
            'password' => 'sometimes|required|string|min:6',
            'about'    => 'nullable|string',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $author->update($validated);

        return response()->json($author);
    }

    /**
     * Remover um autor específico.
     */
    public function destroy($id)
    {
        $author = Author::find($id);

        if (!$author) {
            return response()->json(['message' => 'Autor não encontrado'], 404);
        }

        $author->delete();

        return response()->json(['message' => 'Autor deletado com sucesso']);
    }
}
