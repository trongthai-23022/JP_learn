<?php

use App\Models\Vocabulary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VocabularyController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::post('test', 'test');
});
Route::controller(UserController::class)->middleware('jwt.auth')->group(function () {
    Route::get('users', 'index');
    Route::get('users/{id}', 'show');
    Route::post('users', 'store');
    Route::put('users/{id}', 'update');
    Route::delete('users/{id}', 'destroy');
});
Route::controller(VocabularyController::class)->middleware('jwt.auth')->group(function(){
    Route::get('vocabularies', 'index');
    Route::get('vocabularies/{id}', 'show');
    Route::post('vocabularies', 'store');
    Route::put('vocabularies/{id}', 'update');
    Route::delete('vocabularies/{id}', 'destroy');
});

//Route controller Lesson with middleware auth



