<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('atelier_participant', function (Blueprint $table) {
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->foreignId('atelier_id')
                ->constrained('ateliers')
                ->cascadeOnDelete();

            $table->timestamp('date_inscription')->useCurrent();

            $table->primary(['user_id', 'atelier_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('atelier_participant');
    }
};