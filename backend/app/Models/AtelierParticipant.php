<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class AtelierParticipant extends Pivot
{
    protected $table = 'atelier_participant';

    public $incrementing = false;

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'atelier_id',
        'date_inscription',
    ];
}