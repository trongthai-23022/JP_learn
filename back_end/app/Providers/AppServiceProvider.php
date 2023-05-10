<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //register UserRepository
        $this->app->singleton(
            \App\Repositories\User\UserRepositoryInterface::class,
            \App\Repositories\User\UserRepository::class
        );
        //register VocabularyRepository
        $this->app->singleton(
            \App\Repositories\Vocabulary\VocabularyRepositoryInterface::class,
            \App\Repositories\Vocabulary\VocabularyRepository::class
        );
        //register StudyHistoryRepository
        $this->app->singleton(
            \App\Repositories\StudyHistory\StudyHistoryRepositoryInterface::class,
            \App\Repositories\StudyHistory\StudyHistoryRepository::class
        );
        //register LessonRepository
        $this->app->singleton(
            \App\Repositories\Lesson\LessonRepositoryInterface::class,
            \App\Repositories\Lesson\LessonRepository::class
        );

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}