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
        // $this->middleware('auth:api', ['except' => ['login', 'register', 'test']]);
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



        $user = Auth::user();
        return response()->json([
            'status' => 'success',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60 // Thời gian hết hạn của token JWT tính bằng giây
        ]);
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
        // Lấy Refresh Token từ yêu cầu
        $refreshToken = $request->input('refresh_token');

        // Kiểm tra tính hợp lệ của Refresh Token
        if (!$refreshToken) {
            return response()->json(['error' => 'refresh_token_required'], 400);
        }

        try {
            // Refresh token
            $newToken = JWTAuth::refresh($refreshToken);

            return response()->json([
                'access_token' => $newToken,
                'token_type' => 'bearer',
                'expires_in' => JWTAuth::factory()->getTTL() * 60
            ]);
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_refresh_token'], 500);
        }
    }

    public function test()
    {
        return response()->json(['message' => 'Hello World!']);
    }
}
