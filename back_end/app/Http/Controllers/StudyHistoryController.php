<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\StudyHistory\StudyHistoryRepositoryInterface;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class StudyHistoryController extends Controller
{
    //Repository
    protected $studyHistoryRepository;

    public function __construct(StudyHistoryRepositoryInterface $studyHistoryRepository)
    {
        $this->studyHistoryRepository = $studyHistoryRepository;
    }

    //Show all Folder of this user verify with jwt
    public function showAllStudyHistoryOfUser()
    {   
        //xác thực người dùng
        $user = JWTAuth::parseToken()->authenticate();

        //lay id tu token
        $user_id = $user->id;

        //get all folder (name, descrip) of this user

        


        $studyHistories = $this->studyHistoryRepository->getAllStudyHistoryOfUser($user_id);
        return response()->json($studyHistories);
    }


    // public function index()
    // {
    //     $studyHistories = $this->studyHistoryRepository->getAll();
    //     return response()->json($studyHistories);
    // }

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
