<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Atelier extends Model
{
    protected $fillable = [
        'titre',
        'description',
        'date',
        'duree',
        'formateur_id',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function formateur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'formateur_id');
    }

    public function participants(): BelongsToMany
    {
        return $this->belongsToMany(
            User::class,
            'atelier_participant',
            'atelier_id',
            'user_id'
        )->withPivot('date_inscription');
    }
}