<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserProfile;
use App\Models\PasswordReset;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset as PasswordResetEvent;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'me', 'refresh', 'check_mail', 'reset_password', 'forgotPassword', 'resetPassword', 'updatePassword']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return $this->response_json(0, 'Unauthorized', ['error' => 'Unauthorized']);
            // return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function register(Request $request)
    {    
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            $data = ['errors' => $validator->errors()];
            return $this->response_json(0, config('chat_config.REGISTER_ERROR'), $data);
        }

        $user = User::create([
            'name'      => $request['name'],
            'email'     => $request['email'],
            'password'  => bcrypt($request['password'])
        ]);

        $profile = UserProfile::createProfile(['user_id' => $user['id']]);

        $token = auth()->attempt($request->all());

        $data = [
            'users'      => $user,
            'token'     => $token
        ];

        return $this->response_json(1, config('chat_config.REGISTER_SUCCESS'), $data);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    // public function me()
    // {
    //     return response()->json(auth()->user());
    // }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        $data = [
            'user' => auth()->user(),
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ];

        return $this->response_json(1, 'login success', $data);
    }

    public function check_mail(Request $request) {

        $emailReset = User::where('email', $request->email)->first();

        if($emailReset) {

            $data = [
                'user'       => $emailReset,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60
            ];

            return $this->response_json(1, 'check mail success', $data);

        }
        else {
            
            return $this->response_json(0, 'check mail fail');

        }
    }

    public function reset_password(Request $request) {

        $user = User::where('email', $request->email)->first();

        if($user) {

            $update_password = $user->update(['password' => bcrypt($request->new_password)]);

            if($update_password) {

                return $this->response_json(1, 'update password success');

            }

            return $this->response_json(0, 'update password fail');
            
        }
        else {

            return $this->response_json(0, 'update password fail');

        }

    }


    public function forgotPassword(Request $request) {
        // $request->validate(['email' => 'required|email']);
    
        $status = Password::sendResetLink(
            $request->only('email')
        );
    
        return $status === Password::RESET_LINK_SENT
                    ? $this->response_json(1, 'We have e-mailed your password reset link!', $status)
                    : $this->response_json(0, 'sent mail resset fail', $status);
    }

    public function resetPassword(Request $request, $token) {
    }

    public function updatePassword(Request $request) {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);
     
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));
     
                $user->save();
     
                event(new PasswordResetEvent($user));
            }
        );

        if($status === Password::PASSWORD_RESET) {
            PasswordReset::where('token', $request->token)->delete();
            return $this->response_json(1, 'Password reset success.', $status);
        }
        else {
            $this->response_json(0, 'Password reset fail', $status);
        }
    }
}
