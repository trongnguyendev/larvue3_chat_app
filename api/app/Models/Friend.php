<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Friend extends Model
{
    use HasFactory;

    protected $table = 'friends';

    protected $fillable = [
        'user_id',
        'friend_id',
        'friend'
    ];

    public function scopeWhereIsFriend($query)
    {
        return $query->where('friend', '0');
    }

    public function user_infor()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public static function insertFriend($data)
    {
        $friend = Friend::create($data);

        return $friend;
    }

    // public static function listFriend($id)
    // {
    //     $user = User::find($id)->friends();
    //     // $friends = Friend::find($id);

    //     return $user;
    // }
}
