<?php
namespace App\Repositories\Lesson;

use App\Repositories\RepositoryInterface;

interface LessonRepositoryInterface extends RepositoryInterface
{
    public function getAll();
    public function find($id);
    public function create($attributes = []);
    public function update($id, $attributes = []);
    public function delete($id);
}
