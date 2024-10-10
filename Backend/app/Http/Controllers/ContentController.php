<?php

namespace App\Http\Controllers;

use App\Models\Content;
use Illuminate\Http\Request;

class ContentController extends Controller
{
    /**
     * Exibir uma lista de conteúdos.
     */
    public function index()
    {
        $contents = Content::with(['author', 'book'])->get();
        return response()->json($contents);
    }

    /**
     * Armazenar um novo conteúdo.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'content'    => 'required|string',
            'author_id'  => 'required|exists:authors,id',
            'book_id'    => 'required|exists:books,id',
        ]);

        $content = Content::create($validated);

        return response()->json($content, 201);
    }

    /**
     * Exibir um conteúdo específico.
     */
    public function show($id)
    {
        $content = Content::with(['author', 'book'])->find($id);

        if (!$content) {
            return response()->json(['message' => 'Conteúdo não encontrado'], 404);
        }

        return response()->json($content);
    }

    /**
     * Atualizar um conteúdo específico.
     */
    public function update(Request $request, $id)
    {
        $content = Content::find($id);

        if (!$content) {
            return response()->json(['message' => 'Conteúdo não encontrado'], 404);
        }

        $validated = $request->validate([
            'content'    => 'sometimes|required|string',
            'author_id'  => 'sometimes|required|exists:authors,id',
            'book_id'    => 'sometimes|required|exists:books,id',
        ]);

        $content->update($validated);

        return response()->json($content);
    }

    /**
     * Remover um conteúdo específico.
     */
    public function destroy($id)
    {
        $content = Content::find($id);

        if (!$content) {
            return response()->json(['message' => 'Conteúdo não encontrado'], 404);
        }

        $content->delete();

        return response()->json(['message' => 'Conteúdo deletado com sucesso']);
    }
}
