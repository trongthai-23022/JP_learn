<?php
namespace App\Repositories\Folder;

use App\Repositories\RepositoryInterface;

interface FolderRepositoryInterface extends RepositoryInterface
{
    public function getAll();
    public function find($id);
    public function create($attributes = []);
    public function update($id, $attributes = []);
    public function delete($id);
}
