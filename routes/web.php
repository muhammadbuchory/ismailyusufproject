<?php

use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PortfolioController::class, 'show'])->name('home');
Route::get('/{section}/{id?}', [PortfolioController::class, 'show'])->name('portfolio');
