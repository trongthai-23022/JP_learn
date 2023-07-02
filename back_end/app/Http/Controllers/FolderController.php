<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\Folder\FolderRepositoryInterface;

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
        //validate dữ liệu được gửi lên
        $this->validate($request, [
            'name' => 'required',
            'description' => 'required',
            'image' => 'required',
            'course_id' => 'required',
        ]);

        $folder = $this->folderRepository->create($request->all());
        return response()->json($folder);
    }

    public function update(Request $request, $id)
    {
        //validate dữ liệu được gửi lên
        $this->validate($request, [
            'name' => 'required',
            'description' => 'required',
            'image' => 'required',
            'course_id' => 'required',
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
