<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

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
    Route::post('refresh', [AuthController::class, 'register']);
    Route::get('me', [AuthController::class, 'me']);
    
});

// change password without mail
Route::post('check_mail', [AuthController::class, 'check_mail']);
Route::post('reset_password', [AuthController::class, 'reset_password']);

// change password with mail
Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->name('password.email');
Route::get('/reset-password/{token}', [AuthController::class, 'resetPassword'])->name('password.reset');
Route::post('/reset-password', [AuthController::class, 'updatePassword'])->name('password.update');