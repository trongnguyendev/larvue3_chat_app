<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\GroupChatController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
    
});

// change password without mail
Route::post('check_mail', [AuthController::class, 'check_mail']);
Route::post('reset_password', [AuthController::class, 'reset_password']);

// change password with mail
Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->name('password.email');
Route::get('/reset-password/{token}', [AuthController::class, 'resetPassword'])->name('password.reset');
Route::post('/reset-password', [AuthController::class, 'updatePassword'])->name('password.update');

Route::group([
    'middleware' => 'auth:api',
], function ($router) {
    Route::get('message', [MessagesController::class, 'index'])->name('message.index');
    Route::post('message', [MessagesController::class, 'store'])->name('message.store');

    Route::get('me', [UserProfileController::class, 'me'])->name('user.me');
    // Route::post('find_friend', [UserProfileController::class, 'findFriend'])->name('user.findFriend');

    Route::post('check_conversation', [ConversationController::class, 'getConversationByUser'])->name('conversation.check');
    Route::post('get_conversation', [ConversationController::class, 'getMessageConversationsByUser'])->name('conversation.getByUser');

    Route::post('create_conversation', [ConversationController::class, 'sendMessage'])->name('conversation.create');


    // new api
    Route::post('find_friend', [FriendController::class, 'find_user'])->name('friend.find_user');
    Route::post('create_relationship', [FriendController::class, 'create_relationship'])->name('relationship.create');
    Route::post('get_relationships_by_status', [FriendController::class, 'get_relationships_by_status'])->name('relationship.list');
    Route::post('update_relationship_by_status', [FriendController::class, 'update_relationship_by_status'])->name('relationship.update_status');

    // new group chat api
    Route::post('create_group', [GroupChatController::class, 'create_group'])->name('group.create');
    Route::post('get_group', [GroupChatController::class, 'get_group'])->name('group.create');

    Route::post('get_message_by_group_id', [GroupChatController::class, 'get_messages_by_groups'])->name('group.get_message_by_group');
    Route::post('send_message', [GroupChatController::class, 'send_message'])->name('group.send_message');

    Route::post('get_last_message_by_group_name', [FriendController::class, 'get_last_message_by_group_name'])->name('friend.get_last_message');


    //
    
});




// Route::get('me', [AuthController::class, 'me']);
    