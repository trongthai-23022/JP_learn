<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\StudyHistory;
use Illuminate\Http\Request;
use App\Repositories\Folder\FolderRepositoryInterface;
use Tymon\JWTAuth\Facades\JWTAuth;

class FolderController extends Controller
{
    //repository json
    protected $folderRepository;

    public function __construct(FolderRepositoryInterface $folderRepository)
    {
        $this->folderRepository = $folderRepository;
    }

    public function index()
    {
        $folders = $this->folderRepository->getAll();
        return response()->json($folders);
    }

    public function show($id)
    {
        $folder = $this->folderRepository->find($id);
        return response()->json($folder);
    }

    public function store(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();

        //validate dữ liệu được gửi lên
        $this->validate($request, [
            'name' => 'required',
            'description' => 'required',
        ]);

        $folder = $this->folderRepository->create($request->all());

        //tạo thư mục mới đồng thơi tạo 1 id mới trong bảng historystudy
        $history = new StudyHistory;
        $history->user_id = $user->id;
        $history->folder_id = $folder->id;
        $history->save();

        return response()->json($folder);
    }

    public function update(Request $request, $id)
    {
        //validate dữ liệu được gửi lên
        $this->validate($request, [
            'name' => 'required',
            'description' => 'required',
        ]);
        $folder = $this->folderRepository->update($id, $request->all());
        return response()->json($folder);
    }

    public function destroy($id)
    {
        $folder = $this->folderRepository->delete($id);
        return response()->json($folder);
    }


}
