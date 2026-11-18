<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;    
use App\Http\Controllers\AtelierController;
use App\Http\Controllers\FormateurController;




// ATELIERS
Route::get('/ateliers', [AtelierController::class, 'index']);

Route::post('/ateliers', [AtelierController::class, 'store']);

Route::get('/ateliers/{atelier}', [AtelierController::class, 'show']);

Route::put('/ateliers/{atelier}', [AtelierController::class, 'update']);

Route::delete('/ateliers/{atelier}', [AtelierController::class, 'destroy']);


Route::get('/formateurs', [AtelierController::class, 'listeFormateurs']);

// ASSOC UN FORMATEUR
Route::put('/ateliers/{atelier}/formateur', [AtelierController::class, 'associerFormateur']);




// CONSULTER LES PARTICIPANTS
Route::get('/ateliers/{atelier}/participants', [AtelierController::class, 'participants']);





// Voir les ateliers dun for
Route::get('/formateurs/{formateur}/ateliers', [FormateurController::class, 'ateliers']);

// Voir les participants dune atelier
Route::get('/formateurs/{formateur}/participants', [FormateurController::class, 'participants']);






    
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


