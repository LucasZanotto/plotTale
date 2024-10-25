<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Author;
use Illuminate\Support\Facades\Hash;

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Author;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        // Validação dos dados recebidos
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:authors',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Criação do novo autor
        $author = Author::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Author registered successfully'], 201);
    }


    public function login(Request $request)
{
    // Validação dos dados de login
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    // Busca o autor pelo email
    $author = Author::where('email', $request->email)->first();

    // Verifica se o autor foi encontrado e se a senha está correta
    if ($author && Hash::check($request->password, $author->password)) {
        // O usuário está autenticado
        return response()->json(['message' => 'Login successful', 'author' => $author], 200);
    }

    return response()->json(['message' => 'Invalid credentials'], 401);
}
}
