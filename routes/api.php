<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::controller(UserController::class)->group(function (){

    Route::get('users','index');
    Route::get('user/{id}','edit');
    Route::post('user/create', 'store');

});

