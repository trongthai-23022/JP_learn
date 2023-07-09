<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Validator;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except(['login', 'refresh','register']);
    }


    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        return response()->json(['access_token' => $token]);
    }

    public function logout()
    {
        // Xóa token khỏi CSDL
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json(['message' => 'Đăng xuất thành công']);
    }

    public function register(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user', 'token'), 201);
    }
    public function refresh(Request $request)
    {
        $refreshToken = $request->header('Authorization');

        try {
            $newToken = JWTAuth::refresh($refreshToken);

            return response()->json(['access_token' => $newToken]);
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_refresh_token'], 500);
        }
    }

    public function me()
    {
        $user = Auth::user();
        return response()->json(['user' => $user]);
    }


}
