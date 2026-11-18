<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Validation\ValidationException;

class FormateurController extends Controller
{
    public function ateliers(User $formateur)
    {
        $this->verifierFormateur($formateur);

        return $formateur->ateliersAnimes()
            ->withCount('participants')
            ->get();
    }

    public function participants(User $formateur)
    {
        $this->verifierFormateur($formateur);

        return $formateur->ateliersAnimes()
            ->with('participants')
            ->get()
            ->map(function ($atelier) {
                return [
                    'atelier_id' => $atelier->id,
                    'titre' => $atelier->titre,
                    'participants' => $atelier->participants
                ];
            });
    }

    private function verifierFormateur(User $user)
    {
        $user->load('roleType');

        if (!$user->roleType || $user->roleType->name !== 'Formateur') {
            throw ValidationException::withMessages([
                'formateur' => 'Cet utilisateur n’est pas un formateur.'
            ]);
        }
    }
}