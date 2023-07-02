<?php

namespace App\Repositories\LessonVocabulary;

use App\Repositories\RepositoryInterface;

interface LessonVocabularyRepositoryInterface extends RepositoryInterface
{
    public function getAll();
    public function find($id);
    public function create($attributes = []);
    public function update($id, $attributes = []);
    public function delete($id);
}
