<?php

namespace App\Repositories\Folder;

use App\Repositories\BaseRepository;
use App\Models\Folder;


class FolderRepository extends BaseRepository implements FolderRepositoryInterface{
    protected $model;

    public function __construct(Folder $model)
    {
        parent::__construct($model);
    }

}


