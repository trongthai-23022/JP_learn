<?php

namespace App\Repositories\User;
use App\Repositories\BaseRepository;
use App\Models\User;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    //lấy model tương ứng
    protected $model;

    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    public function create($attributes = [])
    {
        //Use to create a new user have password is hashed
        $attributes['password'] = bcrypt($attributes['password']);
        return $this->model->create($attributes);
    }
}
