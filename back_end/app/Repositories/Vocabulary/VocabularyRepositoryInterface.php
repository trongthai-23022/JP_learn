<?php
namespace App\Repositories\Vocabulary;

use App\Repositories\RepositoryInterface;

interface VocabularyRepositoryInterface extends RepositoryInterface
{
    public function getAll();
    public function find($id);
    public function create($attributes = []);
    public function update($id, $attributes = []);
    public function delete($id);
}
