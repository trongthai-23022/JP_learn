<?php

use App\Http\Controllers\FolderController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\LessonVocabularyController;
use App\Http\Controllers\StudyHistoryController;
use App\Models\LessonVocabulary;
use App\Models\StudyHistory;
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
    Route::post('me', 'me');    
});
Route::controller(UserController::class)->middleware('jwt.auth')->group(function () {
    Route::get('users', 'index');
    Route::get('users/{id}', 'show');
    Route::post('users', 'store');
    Route::put('users/{id}', 'update');
    Route::delete('users/{id}', 'destroy');
});
//folder
Route::controller(FolderController::class)->middleware('jwt.auth')->group(function(){
    Route::get('folders', 'index');
    Route::get('folders/{id}', 'show');
    Route::get('folders/findByFolderName/{folder_name}', 'findByFolderName');
    Route::post('folders', 'store');
    Route::put('folders/{id}', 'update');
    Route::delete('folders/{id}', 'destroy');
});

Route::controller(VocabularyController::class)->middleware('jwt.auth')->group(function(){
    Route::get('vocabularies', 'index');
    Route::get('vocabularies/{id}', 'show');
    // Route::get('vocabularies/findByJapaneseWord/{type}/{japanese_word}', 'findByJapaneseWord');
    Route::post('vocabularies', 'store');
    Route::put('vocabularies/{id}', 'update');
    Route::delete('vocabularies/{id}', 'destroy');
});

//find word but no middlewwrare
Route::get('vocabularies/findByJapaneseWord/{type}/{japanese_word}', 'App\Http\Controllers\VocabularyController@findByJapaneseWord');

Route::controller(LessonController::class)->middleware('jwt.auth')->group(function(){
    Route::get('lessons', 'index');
    Route::get('lessons/{id}', 'show');
    Route::post('lessons', 'store');
    Route::post('lessons/{id}', 'update');
    Route::delete('lessons/{id}', 'destroy');
});

Route::controller(StudyHistoryController::class)->middleware('jwt.auth')->group(function(){
    Route::get('study_histories', 'index');
    Route::get('study_histories/{id}', 'show');
    Route::post('study_histories', 'store');
    Route::put('study_histories/{id}', 'update');
    Route::delete('study_histories/{id}', 'destroy');
    Route::post('study_histories/1', 'showAllStudyHistoryOfUser');
});

Route::controller(LessonVocabularyController::class)->middleware('jwt.auth')->group(function(){
    Route::get('lesson_vocabularies', 'index');
    Route::get('lesson_vocabularies/{id}', 'show');
    Route::post('lesson_vocabularies', 'store');
    Route::put('lesson_vocabularies/{id}', 'update');
    Route::delete('lesson_vocabularies/{id}', 'destroy');
});



