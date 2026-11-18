<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable
{
    protected $fillable = [
        'email',
        'name',
        'password',
        'role_type_id',
    ];

    protected $hidden = [
        'password',
    ];

    public function roleType(): BelongsTo
    {
        return $this->belongsTo(RoleType::class, 'role_type_id');
    }

    public function ateliersAnimes(): HasMany
    {
        return $this->hasMany(Atelier::class, 'formateur_id');
    }

    public function ateliersInscrits(): BelongsToMany
    {
        return $this->belongsToMany(
            Atelier::class,
            'atelier_participant',
            'user_id',
            'atelier_id'
        )->withPivot('date_inscription');
    }
}