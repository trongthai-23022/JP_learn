<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\StudyHistory\StudyHistoryRepositoryInterface;
use Illuminate\Http\Request;

class StudyHistoryController extends Controller
{
    //Repository
    protected $studyHistoryRepository;

    public function __construct(StudyHistoryRepositoryInterface $studyHistoryRepository)
    {
        $this->studyHistoryRepository = $studyHistoryRepository;
    }

    public function index()
    {
        $studyHistories = $this->studyHistoryRepository->getAll();
        return response()->json($studyHistories);
    }

    public function show($id)
    {
        $studyHistory = $this->studyHistoryRepository->find($id);
        return response()->json($studyHistory);
    }

    public function store(Request $request)
    {
        //validate dữ liệu được gửi lên
        $this->validate($request, [
            'user_id' => 'required',
            'vocabulary_id' => 'required',
            'status' => 'required',
        ]);

        $studyHistory = $this->studyHistoryRepository->create($request->all());
        return response()->json($studyHistory);
    }
    
    public function update(Request $request, $id)
    {
        //validate dữ liệu được gửi lên
        $this->validate($request, [
            'user_id' => 'required',
            'vocabulary_id' => 'required',
            'status' => 'required',
        ]);
        $studyHistory = $this->studyHistoryRepository->update($id, $request->all());
        return response()->json($studyHistory);
    }

    public function destroy($id)
    {
        $this->studyHistoryRepository->delete($id);
        return response()->json(['message' => 'StudyHistory deleted successfully']);
    }

}
