<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    use HasFactory;

    protected $table = 'user_profiles';

    protected $fillable = [
        'user_id',
        'birthday',
        'avarta'
    ];

    public static function createProfile($data)
    {
        $profile = UserProfile::create($data);
        
        return $profile;
    }
}
