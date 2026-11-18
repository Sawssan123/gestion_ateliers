<?php

namespace App\Http\Controllers;

use App\Models\Atelier;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AtelierController extends Controller
{
   
    public function index()
    {
        return Atelier::with('formateur')
            ->withCount('participants')
            ->get();
    }

    public function show(Atelier $atelier)
{
    return response()->json(
        $atelier->load('formateur')
            ->loadCount('participants')
    );
}
    
    public function store(Request $request)
    {
        $data = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'duree' => 'required|integer|min:1',
            'formateur_id' => 'nullable|exists:users,id',
        ]);

        if (!empty($data['formateur_id'])) {
            $this->verifierFormateur($data['formateur_id']);
        }

        $atelier = Atelier::create($data);

        return response()->json($atelier->load('formateur'), 201);
    }

    private function verifierFormateur($userId)
    {
        $user = User::with('roleType')->findOrFail($userId);

        if (!$user->roleType || $user->roleType->name !== 'Formateur') {
            throw ValidationException::withMessages([
                'formateur_id' => 'Cet utilisateur n’est pas un formateur.'
            ]);
        }
    }
   
    

    public function update(Request $request, Atelier $atelier)
    {
        $data = $request->validate([
            'titre' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'date' => 'sometimes|required|date',
            'duree' => 'sometimes|required|integer|min:1',
            'capacite' => 'sometimes|required|integer|min:1',
            'formateur_id' => 'nullable|exists:users,id',
        ]);

        if (isset($data['formateur_id'])) {
            $this->verifierFormateur($data['formateur_id']);
        }

        $atelier->update($data);

        return response()->json($atelier->load('formateur'));
    }

    
    public function destroy(Atelier $atelier)
    {
        $atelier->delete();

        return response()->json([
            'message' => 'Atelier supprimé avec succès'
        ]);
    }


    public function listeFormateurs()
    {
        return User::whereHas('roleType', function ($query) {
            $query->where('name', 'Formateur');
        })->get(['id', 'email']);
    }

    
    // Associer un formateur a un atelier
    public function associerFormateur(Request $request, Atelier $atelier)
    {
        $data = $request->validate([
            'formateur_id' => 'required|exists:users,id',
        ]);

        $this->verifierFormateur($data['formateur_id']);

        $atelier->update([
            'formateur_id' => $data['formateur_id']
        ]);

        return response()->json([
            'message' => 'Formateur associé avec succès',
            'atelier' => $atelier->load('formateur')
        ]);
    }




    // Liste des participants dun atelier
    public function participants(Atelier $atelier)
    {
        return response()->json(
            $atelier->participants()
                ->whereHas('roleType', function ($query) {
                    $query->where('name', 'Participant');
                })
                ->get()
        );
    }

    
    
    
        
}