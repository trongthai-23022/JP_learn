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

    public function store($data)
    {
        $folder = $this->model->create($data);

        return $folder;
    }

    public function delete($id)
    {
          // Tìm thư mục cần xóa
    $folder = Folder::find($id);

    if ($folder) {
        // Xóa các bản ghi liên quan trong study_histories
        $folder->studyHistories()->delete();

        $folder->folderLesson()->delete();

        // Tiếp tục xóa thư mục
        $folder->delete();

        // ... Xử lý thành công
        return $folder;
    } else {
        // ... Xử lý khi không tìm thấy thư mục
        return "Không có thư mục này";
    }
    }
}


