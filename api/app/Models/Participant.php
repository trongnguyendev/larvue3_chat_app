<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    use HasFactory;

    public $table = 'participants';

    protected $fillable = [
        'conversation_id',
        'user_id',
        'title',
    ];

    public static function createParticipant($data)
    {
        $participant = Participant::create($data);

        return $participant;
    }
}
