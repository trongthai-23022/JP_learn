<?php
namespace App\Repositories\FolderLesson;

use App\Repositories\RepositoryInterface;

interface FolderLessonRepositoryInterface extends RepositoryInterface
{
    public function getAll();
    public function find($id);
    public function create($attributes = []);
    public function update($id, $attributes = []);
    public function delete($id);
}
