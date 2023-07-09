<?php
namespace App\Repositories\Vocabulary;

use App\Repositories\RepositoryInterface;

interface VocabularyRepositoryInterface extends RepositoryInterface
{
    public function getAll();
    public function find($id);

    //find by japannese_word
    public function findByJapaneseWord($japanese_word,$type);
    public function create($attributes = []);
    public function update($id, $attributes = []);
    public function delete($id);
}
